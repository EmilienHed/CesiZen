using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using CesiZen.Data;
using CesiZen.Models;
using CesiZen.Models.DTOs;
using System;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace CesiZen.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PasswordController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<PasswordController> _logger;

        public PasswordController(AppDbContext context, ILogger<PasswordController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpPost("forgot-password")]
        public async Task<ActionResult<PasswordResetResult>> ForgotPassword([FromBody] ForgotPasswordRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                _logger.LogInformation($"Password reset requested for email: {request.Email}");

                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

                if (user == null)
                {
                    return Ok(new PasswordResetResult
                    {
                        Success = true,
                        Message = "Si cette adresse email existe dans notre système, un email de réinitialisation a été envoyé."
                    });
                }

                // Generate a reset token and send an email
                user.ResetToken = GenerateResetToken();
                user.ResetTokenExpiry = DateTime.UtcNow.AddHours(1);
                await _context.SaveChangesAsync();

                _logger.LogInformation($"Reset token generated for email: {request.Email}");

                return Ok(new PasswordResetResult
                {
                    Success = true,
                    Message = "Si cette adresse email existe dans notre système, un email de réinitialisation a été envoyé."
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during forgot password process");
                return StatusCode(500, new PasswordResetResult
                {
                    Success = false,
                    Message = "Une erreur est survenue lors du traitement de votre demande."
                });
            }
        }

        [HttpPost("reset-password")]
        public async Task<ActionResult<PasswordResetResult>> ResetPassword([FromBody] ResetPasswordRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                _logger.LogInformation("Password reset attempt with token");

                var user = await _context.Users.FirstOrDefaultAsync(u => u.ResetToken == request.Token);

                if (user == null)
                {
                    return BadRequest(new PasswordResetResult
                    {
                        Success = false,
                        Message = "Le lien de réinitialisation est invalide."
                    });
                }

                if (user.ResetTokenExpiry < DateTime.UtcNow)
                {
                    return BadRequest(new PasswordResetResult
                    {
                        Success = false,
                        Message = "Le lien de réinitialisation a expiré. Veuillez demander un nouveau lien."
                    });
                }

                user.MotDePasse = Users.HashPassword(request.NewPassword);
                user.ResetToken = null;
                user.ResetTokenExpiry = null;

                await _context.SaveChangesAsync();

                _logger.LogInformation($"Password reset successful for user: {user.Email}");

                return Ok(new PasswordResetResult
                {
                    Success = true,
                    Message = "Votre mot de passe a été réinitialisé avec succès."
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during password reset process");
                return StatusCode(500, new PasswordResetResult
                {
                    Success = false,
                    Message = "Une erreur est survenue lors de la réinitialisation de votre mot de passe."
                });
            }
        }

        private string GenerateResetToken()
        {
            var randomBytes = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomBytes);
            }

            return Convert.ToBase64String(randomBytes)
                .Replace("+", "-")
                .Replace("/", "_")
                .Replace("=", "");
        }
    }
}