using System.ComponentModel.DataAnnotations;

namespace CesiZen.Models
{
    public class RespirationExercise
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public string Name { get; set; }
        
        [Required]
        public int InspirationDuration { get; set; }
        
        [Required]
        public int HoldDuration { get; set; }
        
        [Required]
        public int ExpirationDuration { get; set; }
        
        public string Description { get; set; }
        
        public bool IsDefault { get; set; } = false;
    }
}