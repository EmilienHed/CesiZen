/*using System;
using System.ComponentModel.DataAnnotations;

namespace CesiZen.Models
{

    public class User
    {
        [Key] // Déclare la clé primaire
        public int IdUtilisateur { get; set; }

        [Required] public string Nom { get; set; }

        [Required] public string Prenom { get; set; }

        [Required]
        [EmailAddress] // Vérifie le format email
        public string Email { get; set; }

        [Required] public string MotDePasse { get; set; } // Hashé en base de données

        public DateTime? DateNaissance { get; set; }

        [Required] public string Role { get; set; } // ENUM : "Visiteur", "Utilisateur", "Administrateur"

        public DateTime DateCreation { get; set; } = DateTime.Now; // Valeur par défaut

        public DateTime? DateDerniereConnexion { get; set; }
    }
}*/



using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CesiZen.Models
{
    public class Users
    {
        [Key] // Clé primaire
        public int IdUtilisateur { get; set; }

        [Required] public string Nom { get; set; }

        [Required] public string Prenom { get; set; }

        [Required]
        [EmailAddress] // Vérifie le format email
        public string Email { get; set; }

        [Required] public string MotDePasse { get; set; } // Hashé en base de données

        public DateTime? DateNaissance { get; set; }

        [Required] public string Role { get; set; } // ENUM : "Visiteur", "Utilisateur", "Administrateur"

        public DateTime DateCreation { get; set; } = DateTime.Now; // Valeur par défaut

        public DateTime? DateDerniereConnexion { get; set; }

        // Relation avec ExerciceRespiratoire (Un User peut avoir plusieurs exercices)
        public virtual List<ExerciceRespiratoire> ExercicesRespiratoires { get; set; } = new List<ExerciceRespiratoire>();
    }
}