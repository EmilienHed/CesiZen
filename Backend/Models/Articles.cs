using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace CesiZen.Models
{
    public class Article
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        [JsonPropertyName("title")]
        public string Title { get; set; }

        [Required]
        [JsonPropertyName("content")]
        public string Content { get; set; }

        [StringLength(255)]
        [JsonPropertyName("imageUrl")]
        public string ImageUrl { get; set; }

        // Nullable DateTime pour permettre la valeur null
        [JsonPropertyName("createdAt")]
        public DateTime? CreatedAt { get; set; }

        [JsonPropertyName("updatedAt")]
        public DateTime? UpdatedAt { get; set; }

        [Required]
        [JsonPropertyName("isActive")]
        public bool IsActive { get; set; } = true;

        [Required]
        [JsonPropertyName("userId")]
        public int UserId { get; set; }

        // Propriété de navigation pour la relation avec User
        [ForeignKey("UserId")]
        [JsonPropertyName("user")]
        public virtual Users User { get; set; }

        // Catégorie de l'article (optionnelle)
        [JsonPropertyName("categoryId")]
        public int? CategoryId { get; set; }

        [ForeignKey("CategoryId")]
        [JsonPropertyName("category")]
        public virtual Category Category { get; set; }
    }
}