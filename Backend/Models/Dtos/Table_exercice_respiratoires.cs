/*using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CesiZen.Models
{
    public class ExerciceRespiratoire
    {
        [Key] // Clé primaire
        public int Id { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "Le nom ne peut pas dépasser 100 caractères.")]
        public string Nom { get; set; }

        [StringLength(500)]
        public string? Description { get; set; }

        [Required]
        [Range(1, 60, ErrorMessage = "La durée d'inspiration doit être entre 1 et 60 secondes.")]
        public int DureeInspiration { get; set; }

        [Required]
        [Range(0, 30, ErrorMessage = "La durée d'apnée doit être entre 0 et 30 secondes.")]
        public int DureeApnee { get; set; }

        [Required]
        [Range(1, 60, ErrorMessage = "La durée d'expiration doit être entre 1 et 60 secondes.")]
        public int DureeExpiration { get; set; }

        [Required]
        public DateTime DateCreation { get; set; } = DateTime.Now; // Valeur par défaut

        // Clé étrangère vers User
        [ForeignKey("Utilisateur")]
        public int? UtilisateurId { get; set; } // Nullable si un exercice peut exister sans utilisateur

        // Navigation vers User
        public virtual Users? Utilisateur { get; set; }
    }
}*/




// Models/DTOs/RespirationExerciseDto.cs
using System.ComponentModel.DataAnnotations;

namespace CesiZen.Models.DTOs
{
    public class RespirationExerciseDto
    {
        public int Id { get; set; }
        
        [Required(ErrorMessage = "Le nom est requis")]
        public string Name { get; set; }
        
        [Required(ErrorMessage = "La durée d'inspiration est requise")]
        [Range(1, 20, ErrorMessage = "La durée d'inspiration doit être entre 1 et 20 secondes")]
        public int InspirationDuration { get; set; }
        
        [Required(ErrorMessage = "La durée d'apnée est requise")]
        [Range(0, 10, ErrorMessage = "La durée d'apnée doit être entre 0 et 10 secondes")]
        public int HoldDuration { get; set; }
        
        [Required(ErrorMessage = "La durée d'expiration est requise")]
        [Range(1, 20, ErrorMessage = "La durée d'expiration doit être entre 1 et 20 secondes")]
        public int ExpirationDuration { get; set; }
        
        public string Description { get; set; }
    }
}