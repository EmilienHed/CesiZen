using Microsoft.AspNetCore.Mvc;  // Pour [ApiController], [Route], [HttpGet], etc.
using Microsoft.EntityFrameworkCore; // Pour DbContext et ToListAsync()
using CesiZen.Data;  // Pour accéder à ton AppDbContext
using CesiZen.Models; // Pour accéder au modèle User (si tu l'as défini dans ce namespace)
using CesiZen.Models.DTOs; // ✅ Correspond au bon namespace
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

[Route("api/users")] // Changé de "[controller]" à "users" pour correspondre à l'URL du frontend
[ApiController]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _context;

    public UsersController(AppDbContext context)
    {
        _context = context;
    }

    // GET api/users
    [HttpGet("")]
    public async Task<ActionResult<IEnumerable<Users>>> GetUsers()
    {
        var users = await _context.Users.ToListAsync();
        return Ok(users);
    }
    
    [HttpPost("create")]
    public async Task<ActionResult<Users>> CreateUser(UserCreateDto dto)
    {
        // Vérifier si l'email est déjà utilisé
        var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
        if (existingUser != null)
        {
            return BadRequest("Cet email est déjà utilisé.");
        }

        var user = new Users
        {
            Nom = dto.Nom,
            Prenom = dto.Prenom,
            Email = dto.Email,
            MotDePasse = Users.HashPassword(dto.MotDePasse),
            DateCreation = DateTime.UtcNow,
            DateNaissance = dto.DateNaissance,
            DateDerniereConnexion = null,
            RoleId = dto.RoleId
        };
        
        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetUserById), new { id = user.IdUtilisateur }, user);
    }
    
    [HttpGet("{id}")] // URL: /api/users/{id}
    public async Task<ActionResult<Users>> GetUserById(int id)
    {
        var user = await _context.Users.FindAsync(id);

        if (user == null)
        {
            return NotFound(new { message = "Utilisateur non trouvé." });
        }

        return Ok(user);
    }

    // Méthode PUT pour la mise à jour d'un utilisateur
    [HttpPut("{id}")]
    public async Task<ActionResult<Users>> UpdateUser(int id, UserUpdateDto dto)
    {
        // Vérifier si l'utilisateur existe
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound(new { message = "Utilisateur non trouvé." });
        }

        // Vérifier si l'email est déjà utilisé par un autre utilisateur
        if (dto.Email != user.Email)
        {
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email && u.IdUtilisateur != id);
            if (existingUser != null)
            {
                return BadRequest("Cet email est déjà utilisé par un autre utilisateur.");
            }
        }

        // Mettre à jour les propriétés de l'utilisateur
        user.Nom = dto.Nom;
        user.Prenom = dto.Prenom;
        user.Email = dto.Email;
        
        // Mise à jour de la date de naissance uniquement si elle est fournie
        if (!string.IsNullOrEmpty(dto.DateNaissance))
        {
            user.DateNaissance = dto.DateNaissance;
        }
        
        user.RoleId = dto.RoleId;
        
        // Sauvegarder les modifications
        try
        {
            await _context.SaveChangesAsync();
            return Ok(user);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = $"Erreur lors de la mise à jour: {ex.Message}" });
        }
    }

    // Méthode pour changer le mot de passe d'un utilisateur
    [HttpPut("{id}/change-password")]
    public async Task<IActionResult> ChangePassword(int id, ChangePasswordDto dto)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound(new { message = "Utilisateur non trouvé." });
        }

        // Mettre à jour le mot de passe
        user.MotDePasse = Users.HashPassword(dto.NewPassword);

        try
        {
            await _context.SaveChangesAsync();
            return Ok(new { message = "Mot de passe mis à jour avec succès." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = $"Erreur lors de la mise à jour du mot de passe: {ex.Message}" });
        }
    }

    // Méthode pour supprimer un utilisateur (si nécessaire)
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound(new { message = "Utilisateur non trouvé." });
        }

        try
        {
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Utilisateur supprimé avec succès." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = $"Erreur lors de la suppression: {ex.Message}" });
        }
    }
}