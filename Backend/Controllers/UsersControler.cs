using Microsoft.AspNetCore.Mvc;  // Pour [ApiController], [Route], [HttpGet], etc.
using Microsoft.EntityFrameworkCore; // Pour DbContext et ToListAsync()
using CesiZen.Data;  // Pour accéder à ton AppDbContext
using CesiZen.Models; // Pour accéder au modèle User (si tu l'as défini dans ce namespace)
using CesiZen.Models.DTOs; // ✅ Correspond au bon namespace

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

        /*var role = await _context.Roles.FirstOrDefaultAsync(r => r.IdRole == 1);
        if (role == null)
        {
            /*role = new Roles { RoleName = "Utilisateur" };
            _context.Roles.Add(role);
            await _context.SaveChangesAsync();#1#
            return BadRequest("Le rôle par defaut n'existe pas");
        }*/

        var user = new Users
        {
            Nom = dto.Nom,
            Prenom = dto.Prenom,
            Email = dto.Email,
            MotDePasse = Users.HashPassword(dto.MotDePasse),
            DateCreation = DateTime.UtcNow,
            DateNaissance = dto.DateNaissance,
            DateDerniereConnexion = null,
            //RoleId = role.IdRole,
        };
        
        _context.SaveChanges();
        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetUserById), new { id = user.IdUtilisateur }, user);
    }
    
    [HttpGet("{id}")] // URL: /api/Users/{id}
    public async Task<ActionResult<Users>> GetUserById(int id)
    {
        var user = await _context.Users.FindAsync(id);

        if (user == null)
        {
            return NotFound(new { message = "Utilisateur non trouvé." });
        }

        return Ok(user);
    }
}