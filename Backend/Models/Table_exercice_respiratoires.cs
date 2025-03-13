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
        public string? Description { get; set; } // Optionnel

        [Required]
//        [Range(1, 60, ErrorMessage = "La durée d'inspiration doit être entre 1 et 60 secondes.")]
        public int DureeInspiration { get; set; }

        [Required]
//        [Range(0, 30, ErrorMessage = "La durée d'apnée doit être entre 0 et 30 secondes.")]
        public int DureeApnee { get; set; }

        [Required]
//        [Range(1, 60, ErrorMessage = "La durée d'expiration doit être entre 1 et 60 secondes.")]
        public int DureeExpiration { get; set; }

        [Required]
        public DateTime DateCreation { get; set; } = DateTime.Now; // Par défaut, la date actuelle

        // Clé étrangère vers l'utilisateur qui a créé l'exercice (si applicable)
        public int? UtilisateurId { get; set; }

        [ForeignKey("UtilisateurId")]
        public virtual User? User { get; set; } // Relation avec l'entité User
    }
}*/





using System;
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
}