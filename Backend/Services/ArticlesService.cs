using CesiZen.Data;
using CesiZen.Models;
using CesiZen.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CesiZen.Services
{
    public class ArticleService : IArticleService
    {
        private readonly AppDbContext _context;

        public ArticleService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Article>> GetAllArticlesAsync()
        {
            // Correction du problème de type dans OrderByDescending
            return await _context.Articles
                .Include(a => a.User)
                .Include(a => a.Category)
                .OrderByDescending(a => a.CreatedAt)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<IEnumerable<Article>> GetActiveArticlesAsync()
        {
            // Correction du problème de type dans OrderByDescending
            var articles = await _context.Articles
                .Include(a => a.User)
                .Include(a => a.Category)
                .Where(a => a.IsActive)
                .AsNoTracking()
                .ToListAsync();
                
            // Tri côté client pour éviter les problèmes avec PostgreSQL
            return articles.OrderByDescending(a => a.CreatedAt ?? DateTime.MinValue);
        }

        public async Task<Article> GetArticleByIdAsync(int id)
        {
            return await _context.Articles
                .Include(a => a.User)
                .Include(a => a.Category)
                .FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<Article> CreateArticleAsync(Article article)
        {
            try
            {
                // S'assurer que CreatedAt a une valeur et est en UTC
                if (!article.CreatedAt.HasValue)
                {
                    article.CreatedAt = DateTime.UtcNow;
                }
                else
                {
                    // Convertir en UTC si ce n'est pas déjà le cas
                    article.CreatedAt = DateTime.SpecifyKind(article.CreatedAt.Value, DateTimeKind.Utc);
                }

                // Vérifier que les propriétés requises sont bien définies
                if (string.IsNullOrEmpty(article.Title))
                {
                    throw new ArgumentException("Le titre de l'article est requis.");
                }

                if (string.IsNullOrEmpty(article.Content))
                {
                    throw new ArgumentException("Le contenu de l'article est requis.");
                }

                if (article.UserId <= 0)
                {
                    throw new ArgumentException("L'ID de l'utilisateur est invalide.");
                }

                _context.Articles.Add(article);
                await _context.SaveChangesAsync();

                return article;
            }
            catch (Exception ex)
            {
                // Remonter l'exception pour qu'elle soit gérée par le contrôleur
                throw new Exception($"Erreur lors de la création de l'article: {ex.Message}", ex);
            }
        }

        public async Task<Article> UpdateArticleAsync(Article article)
        {
            var existingArticle = await _context.Articles.FindAsync(article.Id);

            if (existingArticle == null)
                return null;

            // Préserver la date de création originale si elle existe
            var originalCreatedAt = existingArticle.CreatedAt;

            _context.Entry(existingArticle).CurrentValues.SetValues(article);
            
            // Restaurer la date de création originale et s'assurer qu'elle est en UTC
            if (originalCreatedAt.HasValue)
            {
                existingArticle.CreatedAt = DateTime.SpecifyKind(originalCreatedAt.Value, DateTimeKind.Utc);
            }
            
            // S'assurer que UpdatedAt est en UTC
            existingArticle.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return existingArticle;
        }

        public async Task<bool> DeleteArticleAsync(int id)
        {
            var article = await _context.Articles.FindAsync(id);

            if (article == null)
                return false;

            _context.Articles.Remove(article);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeactivateArticleAsync(int id)
        {
            var article = await _context.Articles.FindAsync(id);

            if (article == null)
                return false;

            article.IsActive = false;
            article.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<IEnumerable<Article>> GetArticlesByCategoryAsync(int categoryId)
        {
            // Correction du problème de type dans OrderByDescending
            var articles = await _context.Articles
                .Include(a => a.User)
                .Include(a => a.Category)
                .Where(a => a.CategoryId == categoryId && a.IsActive)
                .AsNoTracking()
                .ToListAsync();
                
            // Tri côté client pour éviter les problèmes avec PostgreSQL
            return articles.OrderByDescending(a => a.CreatedAt ?? DateTime.MinValue);
        }

        public async Task<IEnumerable<Article>> GetArticlesByUserAsync(int userId)
        {
            // Correction du problème de type dans OrderByDescending
            var articles = await _context.Articles
                .Include(a => a.User)
                .Include(a => a.Category)
                .Where(a => a.UserId == userId)
                .AsNoTracking()
                .ToListAsync();
                
            // Tri côté client pour éviter les problèmes avec PostgreSQL
            return articles.OrderByDescending(a => a.CreatedAt ?? DateTime.MinValue);
        }
    }
}