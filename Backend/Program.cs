using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.EntityFrameworkCore;
using CesiZen.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.OpenApi.Models; // Ajouté pour Swagger

var builder = WebApplication.CreateBuilder(args);

// Ajouter les User Secrets en mode développement
if (builder.Environment.IsDevelopment())
{
    builder.Configuration.AddUserSecrets<Program>();
}

// Récupérer la chaîne de connexion
string connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

// Ajouter Swagger pour générer la documentation de l'API
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "CesiZen API",
        Version = "v1",
        Description = "API pour gérer les utilisateurs et les exercices respiratoires"
    });
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        policy => policy
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});

builder.Services.AddControllers();

var app = builder.Build();

// Activer Swagger et l'UI dans l'environnement de développement
if (app.Environment.IsDevelopment())
{
    app.UseSwagger(); // Active Swagger
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "CesiZen API v1"); // Le fichier JSON généré par Swagger
        c.RoutePrefix = string.Empty; // Cela rend Swagger accessible sur la racine de l'URL (par exemple http://localhost:5000/)
    });
}

// Activer CORS
app.UseCors("AllowAngular");

app.UseAuthorization();
app.MapControllers();

app.Run();