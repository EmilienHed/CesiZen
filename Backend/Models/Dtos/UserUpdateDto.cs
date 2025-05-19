using System.ComponentModel.DataAnnotations;

namespace CesiZen.Models.DTOs
{
    public class UserUpdateDto
    {
        [Required]
        public string Nom { get; set; }
        
        [Required]
        public string Prenom { get; set; }
        
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        
        public string? DateNaissance { get; set; }
        
        [Required]
        public int RoleId { get; set; }
    }
}