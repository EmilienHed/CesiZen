using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CesiZen.Models
{
    public class exercice_Utilisateur
    {
        [Key, Column(Order = 0)]
        [ForeignKey("Utilisateur")]
        public int UtilisateurId { get; set; }

        [Key, Column(Order = 1)]
        [ForeignKey("Exercice")]
        public int ExerciceId { get; set; }

        // Navigation properties
        public virtual Users Utilisateur { get; set; }
        public virtual RespirationExercise Exercice { get; set; }
    }
}