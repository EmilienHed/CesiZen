using Microsoft.AspNetCore.Mvc;  // Pour [ApiController], [Route], [HttpGet], etc.
using Microsoft.EntityFrameworkCore; // Pour DbContext et ToListAsync()
using CesiZen.Data;  // Pour accéder à ton AppDbContext
using CesiZen.Models; // Pour accéder au modèle User (si tu l'as défini dans ce namespace)
using CesiZen.Models.DTOs; // ✅ Correspond au bon namespace

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var result = await _authService.Login(request);

        if (result == null)
            return Unauthorized(new { message = "Email ou mot de passe incorrect" });

        return Ok(result);
    }
}