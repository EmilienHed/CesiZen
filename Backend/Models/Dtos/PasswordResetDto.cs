using System.ComponentModel.DataAnnotations;

namespace CesiZen.Models.DTOs
{
    public class ForgotPasswordRequest
    {
        [Required(ErrorMessage = "L'email est requis")]
        [EmailAddress(ErrorMessage = "Format d'email invalide")]
        public string Email { get; set; }
    }

    public class ResetPasswordRequest
    {
        [Required(ErrorMessage = "Le token est requis")]
        public string Token { get; set; }
        
        [Required(ErrorMessage = "Le nouveau mot de passe est requis")]
        [MinLength(6, ErrorMessage = "Le mot de passe doit contenir au moins 6 caractères")]
        public string NewPassword { get; set; }
        
        [Required(ErrorMessage = "La confirmation du mot de passe est requise")]
        [Compare("NewPassword", ErrorMessage = "Les mots de passe ne correspondent pas")]
        public string ConfirmPassword { get; set; }
    }
    
    public class PasswordResetResult
    {
        public bool Success { get; set; }
        public string Message { get; set; }
    }
}