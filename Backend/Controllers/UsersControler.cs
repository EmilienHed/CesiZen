using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CesiZen.Data;
using CesiZen.Models;
using CesiZen.Models.DTOs;

[Route("api/[controller]")]
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

        // Assigner le rôle Utilisateur (id = 1)
        int roleId = 1; // Forcer le roleId à 1 pour les nouveaux utilisateurs
        
        // Vérifier si le rôle existe - utiliser la propriété Id au lieu de IdRole
        var role = await _context.Role.FirstOrDefaultAsync(r => r.Id == roleId);
        if (role == null)
        {
            return BadRequest("Le rôle par défaut n'existe pas");
        }

        var user = new Users
        {
            Nom = dto.Nom,
            Prenom = dto.Prenom,
            Email = dto.Email,
            MotDePasse = Users.HashPassword(dto.MotDePasse),
            DateCreation = DateTime.UtcNow,
            DateNaissance = dto.DateNaissance, // Conserver en tant que string
            DateDerniereConnexion = null,
            RoleId = roleId,
        };
        
        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetUserById), new { id = user.IdUtilisateur }, user);
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<Users>> GetUserById(int id)
    {
        var user = await _context.Users.FindAsync(id);

        if (user == null)
        {
            return NotFound(new { message = "Utilisateur non trouvé." });
        }

        return Ok(user);
    }

    // PUT api/Users/{id} - Mettre à jour un utilisateur
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(int id, UserUpdateDto dto)
    {
        // Vérifier si l'utilisateur existe
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound(new { message = "Utilisateur non trouvé." });
        }

        // Vérifier si l'email est déjà utilisé par un autre utilisateur
        var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email && u.IdUtilisateur != id);
        if (existingUser != null)
        {
            return BadRequest(new { message = "Cet email est déjà utilisé par un autre utilisateur." });
        }

        // Vérifier si le rôle existe
        var role = await _context.Role.FirstOrDefaultAsync(r => r.Id == dto.RoleId);
        if (role == null)
        {
            return BadRequest(new { message = "Le rôle spécifié n'existe pas." });
        }

        // Mettre à jour les propriétés de l'utilisateur
        user.Nom = dto.Nom;
        user.Prenom = dto.Prenom;
        user.Email = dto.Email;
        user.DateNaissance = dto.DateNaissance;
        user.RoleId = dto.RoleId;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!UserExists(id))
            {
                return NotFound(new { message = "Utilisateur non trouvé." });
            }
            else
            {
                throw;
            }
        }

        return Ok(new { message = "Utilisateur mis à jour avec succès." });
    }

    // PUT api/Users/{id}/change-password - Changer le mot de passe d'un utilisateur
    [HttpPut("{id}/change-password")]
    public async Task<IActionResult> ChangePassword(int id, ChangePasswordDto dto)
    {
        // Vérifier si l'utilisateur existe
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
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!UserExists(id))
            {
                return NotFound(new { message = "Utilisateur non trouvé." });
            }
            else
            {
                throw;
            }
        }

        return Ok(new { message = "Mot de passe modifié avec succès." });
    }

    // DELETE api/Users/{id} - Supprimer un utilisateur
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound(new { message = "Utilisateur non trouvé." });
        }

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Utilisateur supprimé avec succès." });
    }

    private bool UserExists(int id)
    {
        return _context.Users.Any(e => e.IdUtilisateur == id);
    }
}