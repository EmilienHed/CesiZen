using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using CesiZen.Models;
using CesiZen.Interfaces;
using CesiZen.DTOs;

namespace CesiZen.Controllers
{
    [Route("api/articles")] // Changé de [controller] à "articles" en minuscules
    [ApiController]
    public class ArticlesController : ControllerBase
    {
        private readonly IArticleService _articleService;

        public ArticlesController(IArticleService articleService)
        {
            _articleService = articleService;
        }

        // Méthode privée pour convertir un Article en ArticleResponseDTO
        private ArticleResponseDTO ConvertToDTO(Article article)
        {
            if (article == null) return null;

            return new ArticleResponseDTO
            {
                Id = article.Id,
                Title = article.Title,
                Content = article.Content,
                ImageUrl = article.ImageUrl,
                CreatedAt = article.CreatedAt,
                UpdatedAt = article.UpdatedAt,
                IsActive = article.IsActive,
                UserId = article.UserId,
                CategoryId = article.CategoryId,
                Author = article.User != null ? new UserSimpleDTO
                {
                    Id = article.User.IdUtilisateur,
                    Nom = article.User.Nom,
                    Prenom = article.User.Prenom
                } : null,
                Category = article.Category != null ? new CategorySimpleDTO
                {
                    Id = article.Category.Id,
                    Name = article.Category.Name
                } : null
            };
        }

        // GET: api/articles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ArticleResponseDTO>>> GetArticles()
        {
            try 
            {
                // Récupérer tous les articles, pas seulement les actifs
                var articles = await _articleService.GetAllArticlesAsync();
                var articleDtos = articles.Select(a => ConvertToDTO(a)).ToList();
                return Ok(articleDtos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { 
                    message = $"Une erreur est survenue lors de la récupération des articles: {ex.Message}",
                    innerException = ex.InnerException?.Message 
                });
            }
        }

        // GET: api/articles/active
        [HttpGet("active")]
        public async Task<ActionResult<IEnumerable<ArticleResponseDTO>>> GetActiveArticles()
        {
            try
            {
                var articles = await _articleService.GetActiveArticlesAsync();
                var articleDtos = articles.Select(a => ConvertToDTO(a)).ToList();
                return Ok(articleDtos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { 
                    message = $"Une erreur est survenue lors de la récupération des articles actifs: {ex.Message}",
                    innerException = ex.InnerException?.Message 
                });
            }
        }

        // GET: api/articles/all (gardé pour compatibilité)
        [HttpGet("all")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<ArticleResponseDTO>>> GetAllArticles()
        {
            try
            {
                var articles = await _articleService.GetAllArticlesAsync();
                var articleDtos = articles.Select(a => ConvertToDTO(a)).ToList();
                return Ok(articleDtos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { 
                    message = $"Une erreur est survenue lors de la récupération des articles: {ex.Message}",
                    innerException = ex.InnerException?.Message 
                });
            }
        }

        // GET: api/articles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ArticleResponseDTO>> GetArticle(int id)
        {
            try
            {
                var article = await _articleService.GetArticleByIdAsync(id);

                if (article == null)
                {
                    return NotFound();
                }

                var articleDto = ConvertToDTO(article);
                return Ok(articleDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { 
                    message = $"Une erreur est survenue lors de la récupération de l'article: {ex.Message}",
                    innerException = ex.InnerException?.Message 
                });
            }
        }

        // GET: api/articles/category/5
        [HttpGet("category/{categoryId}")]
        public async Task<ActionResult<IEnumerable<ArticleResponseDTO>>> GetArticlesByCategory(int categoryId)
        {
            try
            {
                var articles = await _articleService.GetArticlesByCategoryAsync(categoryId);
                var articleDtos = articles.Select(a => ConvertToDTO(a)).ToList();
                return Ok(articleDtos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { 
                    message = $"Une erreur est survenue lors de la récupération des articles: {ex.Message}",
                    innerException = ex.InnerException?.Message 
                });
            }
        }

        // GET: api/articles/user/5
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<ArticleResponseDTO>>> GetArticlesByUser(int userId)
        {
            try
            {
                var articles = await _articleService.GetArticlesByUserAsync(userId);
                var articleDtos = articles.Select(a => ConvertToDTO(a)).ToList();
                return Ok(articleDtos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { 
                    message = $"Une erreur est survenue lors de la récupération des articles: {ex.Message}",
                    innerException = ex.InnerException?.Message 
                });
            }
        }

        // POST: api/articles
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ArticleResponseDTO>> CreateArticle([FromBody] CreateArticleDTO articleDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                // Créer un nouvel objet Article à partir du DTO
                var article = new Article
                {
                    Title = articleDto.Title,
                    Content = articleDto.Content,
                    ImageUrl = articleDto.ImageUrl,
                    CategoryId = articleDto.CategoryId,
                    UserId = articleDto.UserId,
                    IsActive = articleDto.IsActive,
                    CreatedAt = DateTime.UtcNow
                };

                var createdArticle = await _articleService.CreateArticleAsync(article);
                var responseDto = ConvertToDTO(createdArticle);
                return CreatedAtAction(nameof(GetArticle), new { id = responseDto.Id }, responseDto);
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    message = $"Erreur lors de la création de l'article: {ex.Message}",
                    stackTrace = ex.StackTrace,
                    innerException = ex.InnerException?.Message
                });
            }
        }
        
        // PUT: api/articles/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateArticle(int id, [FromBody] UpdateArticleDTO articleDto)
        {
            if (id != articleDto.Id)
            {
                return BadRequest("L'ID de l'article ne correspond pas à l'ID dans le chemin de l'URL.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var existingArticle = await _articleService.GetArticleByIdAsync(id);
                if (existingArticle == null)
                {
                    return NotFound();
                }

                // Mettre à jour les propriétés
                existingArticle.Title = articleDto.Title;
                existingArticle.Content = articleDto.Content;
                existingArticle.ImageUrl = articleDto.ImageUrl;
                existingArticle.CategoryId = articleDto.CategoryId;
                existingArticle.IsActive = articleDto.IsActive;
                existingArticle.UpdatedAt = DateTime.UtcNow;

                var updatedArticle = await _articleService.UpdateArticleAsync(existingArticle);
                var responseDto = ConvertToDTO(updatedArticle);
                return Ok(responseDto);
            }
            catch (Exception ex)
            {
                return BadRequest(new {
                    message = $"Erreur lors de la mise à jour de l'article: {ex.Message}",
                    stackTrace = ex.StackTrace,
                    innerException = ex.InnerException?.Message
                });
            }
        }

        // DELETE: api/articles/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteArticle(int id)
        {
            try 
            {
                var result = await _articleService.DeleteArticleAsync(id);
                
                if (!result)
                {
                    return NotFound();
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { 
                    message = $"Une erreur est survenue lors de la suppression de l'article: {ex.Message}",
                    innerException = ex.InnerException?.Message 
                });
            }
        }

        // PUT: api/articles/deactivate/5
        [HttpPut("deactivate/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeactivateArticle(int id)
        {
            try
            {
                var result = await _articleService.DeactivateArticleAsync(id);
                
                if (!result)
                {
                    return NotFound();
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { 
                    message = $"Une erreur est survenue lors de la désactivation de l'article: {ex.Message}",
                    innerException = ex.InnerException?.Message 
                });
            }
        }
    }
}