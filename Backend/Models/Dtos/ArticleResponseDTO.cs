using System;
using System.Text.Json.Serialization;

namespace CesiZen.DTOs
{
    public class ArticleResponseDTO
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("title")]
        public string Title { get; set; }

        [JsonPropertyName("content")]
        public string Content { get; set; }

        [JsonPropertyName("imageUrl")]
        public string ImageUrl { get; set; }

        [JsonPropertyName("createdAt")]
        public DateTime? CreatedAt { get; set; }

        [JsonPropertyName("updatedAt")]
        public DateTime? UpdatedAt { get; set; }

        [JsonPropertyName("isActive")]
        public bool IsActive { get; set; }

        [JsonPropertyName("userId")]
        public int UserId { get; set; }

        [JsonPropertyName("categoryId")]
        public int? CategoryId { get; set; }

        // Informations simplifiées sur l'utilisateur
        [JsonPropertyName("author")]
        public UserSimpleDTO Author { get; set; }

        // Informations simplifiées sur la catégorie
        [JsonPropertyName("category")]
        public CategorySimpleDTO Category { get; set; }
    }

    public class UserSimpleDTO
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("nom")]
        public string Nom { get; set; }

        [JsonPropertyName("prenom")]
        public string Prenom { get; set; }
    }

    public class CategorySimpleDTO
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }
    }
} 