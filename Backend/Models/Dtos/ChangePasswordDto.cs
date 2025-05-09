using System.ComponentModel.DataAnnotations;

namespace CesiZen.Models.DTOs
{
    public class ChangePasswordDto
    {
        [Required]
        [MinLength(6, ErrorMessage = "Le mot de passe doit contenir au moins 6 caractères")]
        public string NewPassword { get; set; }
    }
} 