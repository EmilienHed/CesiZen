using System.ComponentModel.DataAnnotations;

namespace CesiZen.DTOs
{
    public class CategoryDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        public int ArticleCount { get; set; }
    }

    public class CreateCategoryDTO
    {
        [Required]
        [StringLength(50, ErrorMessage = "Le nom ne doit pas dépasser 50 caractères")]
        public string Name { get; set; }

        [StringLength(200, ErrorMessage = "La description ne doit pas dépasser 200 caractères")]
        public string Description { get; set; }

        public bool IsActive { get; set; } = true;
    }

    public class UpdateCategoryDTO
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [StringLength(50, ErrorMessage = "Le nom ne doit pas dépasser 50 caractères")]
        public string Name { get; set; }

        [StringLength(200, ErrorMessage = "La description ne doit pas dépasser 200 caractères")]
        public string Description { get; set; }

        public bool IsActive { get; set; }
    }
}