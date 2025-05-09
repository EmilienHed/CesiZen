using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CesiZen.Models
{
    public class Users
    {
        [Key] // Clé primaire
        public int IdUtilisateur { get; set; }

        [Required] 
        public string Nom { get; set; }

        [Required] 
        public string Prenom { get; set; }

        [Required]
        [EmailAddress] // Vérifie le format email
        public string Email { get; set; }

        [Required] 
        [JsonIgnore] // Ne pas inclure le mot de passe dans la réponse JSON
        public string MotDePasse { get; set; }

        // Méthode pour hasher un mot de passe avec BCrypt
        public static string HashPassword(string MotDePasse)
        {
            return BCrypt.Net.BCrypt.HashPassword(MotDePasse);
        }

        // Vérifier si un mot de passe correspond au hash
        public static bool VerifyPassword(string MotDePasse, string hash)
        {
            return BCrypt.Net.BCrypt.Verify(MotDePasse, hash);
        }

        public string? DateNaissance { get; set; }
        
        public int RoleId { get; set; }
        
        [JsonIgnore] // Ignorer cette propriété lors de la sérialisation pour éviter les références circulaires
        public virtual Role Role { get; set; }

        public DateTime DateCreation { get; set; } = DateTime.UtcNow; // Valeur par défaut
        public DateTime? DateDerniereConnexion { get; set; }

        // Nouveaux champs pour la réinitialisation du mot de passe
        [JsonIgnore] // Ne pas inclure le token dans la réponse JSON
        public string? ResetToken { get; set; }
        
        [JsonIgnore] // Ne pas inclure la date d'expiration dans la réponse JSON
        public DateTime? ResetTokenExpiry { get; set; }

        // Relation avec les exercices de respiration
        [JsonIgnore] // Ignorer cette propriété lors de la sérialisation pour éviter les références circulaires
        public virtual List<RespirationExercise> RespirationExercises { get; set; } = new List<RespirationExercise>();
    }
}