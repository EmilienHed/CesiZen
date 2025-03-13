using Microsoft.AspNetCore.Mvc;  // Pour [ApiController], [Route], [HttpGet], etc.
using Microsoft.EntityFrameworkCore; // Pour DbContext et ToListAsync()
using CesiZen.Data;  // Pour accéder à ton AppDbContext
using CesiZen.Models; // Pour accéder au modèle User (si tu l'as défini dans ce namespace)

[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _context;

    public UsersController(AppDbContext context)
    {
        _context = context;
    }

    // get apiusers
    [HttpGet("")]
    public async Task<ActionResult<IEnumerable<Users>>> GetUsers()
    {
        var users = await _context.Users.ToListAsync();
        return Ok(users);
    }
}