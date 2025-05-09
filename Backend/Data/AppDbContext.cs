namespace CesiZen.Data;

using Microsoft.EntityFrameworkCore;
using CesiZen.Models;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    
    // Tables existantes
    public DbSet<Users> Users { get; set; }
    public DbSet<Role> Role { get; set; }
    public DbSet<RespirationExercise> RespirationExercises { get; set; }
    
    // Nouvelles tables pour les articles
    public DbSet<Article> Articles { get; set; }
    public DbSet<Category> Categories { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Users>().ToTable("Users");

        modelBuilder.Entity<Users>()
            .HasOne(u => u.Role)
            .WithMany(u => u.Users)
            .HasForeignKey(u => u.RoleId);

        // Configuration pour Article et Category
        modelBuilder.Entity<Article>()
            .HasOne(a => a.User)
            .WithMany()
            .HasForeignKey(a => a.UserId);

        modelBuilder.Entity<Article>()
            .HasOne(a => a.Category)
            .WithMany(c => c.Articles)
            .HasForeignKey(a => a.CategoryId);
        

        

        // Seed data pour les exercices de respiration (existant)
        modelBuilder.Entity<RespirationExercise>().HasData(
            new RespirationExercise 
            { 
                Id = 1, 
                Name = "748", 
                InspirationDuration = 7, 
                HoldDuration = 4, 
                ExpirationDuration = 8, 
                Description = "Inspiration: 7 secondes / Apnée: 4 secondes / Expiration: 8 secondes",
                IsDefault = true
            },
            new RespirationExercise 
            { 
                Id = 2, 
                Name = "55", 
                InspirationDuration = 5, 
                HoldDuration = 0, 
                ExpirationDuration = 5, 
                Description = "Inspiration: 5 secondes / Apnée: 0 secondes / Expiration: 5 secondes",
                IsDefault = true
            },
            new RespirationExercise 
            { 
                Id = 3, 
                Name = "46", 
                InspirationDuration = 4, 
                HoldDuration = 0, 
                ExpirationDuration = 6, 
                Description = "Inspiration: 4 secondes / Apnée: 0 secondes / Expiration: 6 secondes",
                IsDefault = true
            }
        );
    }
}