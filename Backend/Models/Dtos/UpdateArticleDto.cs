using System.ComponentModel.DataAnnotations;
   
   namespace CesiZen.DTOs
   {
       public class UpdateArticleDTO
       {
           [Required]
           public int Id { get; set; }
   
           [Required]
           [StringLength(100, ErrorMessage = "Le titre ne doit pas dépasser 100 caractères.")]
           public string Title { get; set; }
   
           [Required(ErrorMessage = "Le contenu est requis.")]
           public string Content { get; set; }
   
           [StringLength(255, ErrorMessage = "L'URL de l'image ne doit pas dépasser 255 caractères.")]
           public string ImageUrl { get; set; }
   
           public int? CategoryId { get; set; }
           
           [Required]
           public int UserId { get; set; }
   
           public bool IsActive { get; set; }
       }
   }