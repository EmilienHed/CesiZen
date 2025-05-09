using CesiZen.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CesiZen.Interfaces
{
    public interface IArticleService
    {
        Task<IEnumerable<Article>> GetAllArticlesAsync();
        Task<IEnumerable<Article>> GetActiveArticlesAsync();
        Task<Article> GetArticleByIdAsync(int id);
        Task<Article> CreateArticleAsync(Article article);
        Task<Article> UpdateArticleAsync(Article article);
        Task<bool> DeleteArticleAsync(int id);
        Task<bool> DeactivateArticleAsync(int id);
        Task<IEnumerable<Article>> GetArticlesByCategoryAsync(int categoryId);
        Task<IEnumerable<Article>> GetArticlesByUserAsync(int userId);
    }
}