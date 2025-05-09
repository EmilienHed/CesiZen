/*
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using CesiZen.Models; // Ton modèle User
using CesiZen.Models.DTOs; // LoginRequest & LoginResponse
using CesiZen.Data; // AppDbContext


public interface IAuthService
{
    Task<LoginResponse> Login(LoginRequest request);
}

public class AuthService : IAuthService
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _configuration;

    public AuthService(AppDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    public async Task<LoginResponse> Login(LoginRequest request)
    {
        var user = await _context.Users
            .Include(u => u.Role)
            .FirstOrDefaultAsync(u => u.Email == request.Email);

        if (user == null)
            return null;

        // Vérifier le mot de passe (idéalement avec un hash)
        if (!VerifyPassword(request.Password, user.MotDePasse))
            return null;

        // Générer le token JWT
        var token = GenerateJwtToken(user);

        return new LoginResponse
        {
            Token = token,
            UserId = user.IdUtilisateur,
            UserName = $"{user.Prenom} {user.Nom}",
            Role = user.Role?.Name,
            Expiration = DateTime.UtcNow.AddHours(1)
        };

    }

    public static bool VerifyPassword(string MotDePasse, string hash)
    {
        return BCrypt.Net.BCrypt.Verify(MotDePasse, hash);
    }


    private string GenerateJwtToken(Users user)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.NameIdentifier, user.IdUtilisateur.ToString()),
            new Claim(ClaimTypes.Role, user.Role?.Name ?? "User")
        };

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(1),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}*/


using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using CesiZen.Models; // Ton modèle User
using CesiZen.Models.DTOs; // LoginRequest & LoginResponse
using CesiZen.Data; // AppDbContext

public interface IAuthService
{
    Task<LoginResponse> Login(LoginRequest request);
}

public class AuthService : IAuthService
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _configuration;

    public AuthService(AppDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    public async Task<LoginResponse> Login(LoginRequest request)
    {
        var user = await _context.Users
            .Include(u => u.Role)
            .FirstOrDefaultAsync(u => u.Email == request.Email);

        if (user == null)
            return null;

        // Vérifier le mot de passe (idéalement avec un hash)
        if (!VerifyPassword(request.Password, user.MotDePasse))
            return null;

        // Générer le token JWT
        var token = GenerateJwtToken(user);

        return new LoginResponse
        {
            Token = token,
            UserId = user.IdUtilisateur,
            UserName = $"{user.Prenom} {user.Nom}",
            Role = user.Role?.Name,
            Expiration = DateTime.UtcNow.AddHours(1)
        };
    }

    public static bool VerifyPassword(string password, string hash)
    {
        return BCrypt.Net.BCrypt.Verify(password, hash);
    }

    private string GenerateJwtToken(Users user)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.NameIdentifier, user.IdUtilisateur.ToString()),
            new Claim(ClaimTypes.Role, user.Role?.Name ?? "User")
        };

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(1),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    // Méthode pour vérifier si un utilisateur est administrateur
    public bool IsAdmin(Users user)
    {
        return user?.Role?.Name == "Admin";
    }

    // Méthode pour obtenir l'utilisateur courant
    public async Task<Users> GetCurrentUser(int userId)
    {
        return await _context.Users
            .Include(u => u.Role)
            .FirstOrDefaultAsync(u => u.IdUtilisateur == userId);
    }
}