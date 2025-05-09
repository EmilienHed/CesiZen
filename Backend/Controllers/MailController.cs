/*// Controllers/PasswordController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using CesiZen.Data;
using CesiZen.Models;
using CesiZen.Models.DTOs;
using CesiZen.Services;
using System;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace CesiZen.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PasswordController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IEmailService _emailService;
        private readonly ILogger<PasswordController> _logger;
        
        public PasswordController(
            AppDbContext context, 
            IEmailService emailService,
            ILogger<PasswordController> logger)
        {
            _context = context;
            _emailService = emailService;
            _logger = logger;
        }
        
        // POST: api/Password/forgot-password
        [HttpPost("forgot-password")]
        public async Task<ActionResult<PasswordResetResult>> ForgotPassword([FromBody] ForgotPasswordRequest request)
        {
            // Implémentation pour la demande de réinitialisation...
            // Voir le code complet que je vous ai fourni précédemment
        }
        
        // POST: api/Password/reset-password
        [HttpPost("reset-password")]
        public async Task<ActionResult<PasswordResetResult>> ResetPassword([FromBody] ResetPasswordRequest request)
        {
            // Implémentation pour la réinitialisation avec token...
            // Voir le code complet que je vous ai fourni précédemment
        }
    }
}*/