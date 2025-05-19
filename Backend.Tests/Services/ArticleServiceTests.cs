using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CesiZen.Data;
using CesiZen.Models;
using CesiZen.Services;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace Backend.Tests.Services
{
    public class ArticleServiceTests
    {
        private readonly DbContextOptions<AppDbContext> _options;
        
        public ArticleServiceTests()
        {
            // Utilisation d'une base de données en mémoire pour les tests
            _options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: $"TestDb_{Guid.NewGuid()}")
                .Options;
        }
        
        private AppDbContext CreateContext()
        {
            return new AppDbContext(_options);
        }
        
        private async Task SeedDatabase()
        {
            using var context = CreateContext();
            
            // Ajouter des utilisateurs pour les tests
            var user = new Users
            {
                IdUtilisateur = 1,
                Nom = "Doe",
                Prenom = "John",
                Email = "john.doe@example.com",
                MotDePasse = Users.HashPassword("password"),
                RoleId = 1
            };
            
            // Ajouter des catégories pour les tests
            var category = new Category
            {
                Id = 1,
                Name = "Test Category",
                Description = "Test Description",
                IsActive = true
            };
            
            // Ajouter des articles pour les tests
            var articles = new List<Article>
            {
                new Article
                {
                    Id = 1,
                    Title = "Test Article 1",
                    Content = "Test Content 1",
                    ImageUrl = "test1.jpg",
                    CreatedAt = DateTime.UtcNow.AddDays(-2),
                    IsActive = true,
                    UserId = 1,
                    CategoryId = 1
                },
                new Article
                {
                    Id = 2,
                    Title = "Test Article 2",
                    Content = "Test Content 2",
                    ImageUrl = "test2.jpg",
                    CreatedAt = DateTime.UtcNow.AddDays(-1),
                    IsActive = true,
                    UserId = 1,
                    CategoryId = 1
                },
                new Article
                {
                    Id = 3,
                    Title = "Inactive Article",
                    Content = "Inactive Content",
                    ImageUrl = "inactive.jpg",
                    CreatedAt = DateTime.UtcNow,
                    IsActive = false,
                    UserId = 1,
                    CategoryId = 1
                }
            };
            
            context.Users.Add(user);
            context.Categories.Add(category);
            await context.SaveChangesAsync();
            
            context.Articles.AddRange(articles);
            await context.SaveChangesAsync();
        }
        
        [Fact]
        public async Task GetAllArticlesAsync_ReturnsAllArticles()
        {
            // Arrange
            await SeedDatabase();
            using var context = CreateContext();
            var service = new ArticleService(context);
            
            // Act
            var result = await service.GetAllArticlesAsync();
            
            // Assert
            Assert.Equal(3, result.Count());
        }
        
        [Fact]
        public async Task GetActiveArticlesAsync_ReturnsOnlyActiveArticles()
        {
            // Arrange
            await SeedDatabase();
            using var context = CreateContext();
            var service = new ArticleService(context);
            
            // Act
            var result = await service.GetActiveArticlesAsync();
            
            // Assert
            Assert.Equal(2, result.Count());
            Assert.All(result, article => Assert.True(article.IsActive));
        }
        
        [Fact]
        public async Task GetArticleByIdAsync_ReturnsCorrectArticle()
        {
            // Arrange
            await SeedDatabase();
            using var context = CreateContext();
            var service = new ArticleService(context);
            
            // Act
            var result = await service.GetArticleByIdAsync(1);
            
            // Assert
            Assert.NotNull(result);
            Assert.Equal("Test Article 1", result.Title);
        }
        
        [Fact]
        public async Task CreateArticleAsync_CreatesNewArticle()
        {
            // Arrange
            await SeedDatabase();
            using var context = CreateContext();
            var service = new ArticleService(context);
            
            var newArticle = new Article
            {
                Title = "New Article",
                Content = "New Content",
                ImageUrl = "new.jpg",
                IsActive = true,
                UserId = 1,
                CategoryId = 1
            };
            
            // Act
            var result = await service.CreateArticleAsync(newArticle);
            
            // Assert
            Assert.NotNull(result);
            Assert.Equal("New Article", result.Title);
            Assert.NotEqual(0, result.Id);
            
            // Vérifier que l'article a bien été ajouté à la base de données
            var articles = await service.GetAllArticlesAsync();
            Assert.Equal(4, articles.Count());
        }
        
        [Fact]
        public async Task UpdateArticleAsync_UpdatesExistingArticle()
        {
            // Arrange
            await SeedDatabase();
            using var context = CreateContext();
            var service = new ArticleService(context);
            
            var article = await service.GetArticleByIdAsync(1);
            article.Title = "Updated Title";
            article.Content = "Updated Content";
            
            // Act
            var result = await service.UpdateArticleAsync(article);
            
            // Assert
            Assert.NotNull(result);
            Assert.Equal("Updated Title", result.Title);
            Assert.Equal("Updated Content", result.Content);
            
            // Vérifier que l'article a bien été mis à jour dans la base de données
            var updatedArticle = await service.GetArticleByIdAsync(1);
            Assert.Equal("Updated Title", updatedArticle.Title);
        }
        
        [Fact]
        public async Task DeleteArticleAsync_DeletesArticle()
        {
            // Arrange
            await SeedDatabase();
            using var context = CreateContext();
            var service = new ArticleService(context);
            
            // Act
            var result = await service.DeleteArticleAsync(1);
            
            // Assert
            Assert.True(result);
            
            // Vérifier que l'article a bien été supprimé de la base de données
            var articles = await service.GetAllArticlesAsync();
            Assert.Equal(2, articles.Count());
            Assert.DoesNotContain(articles, a => a.Id == 1);
        }
        
        [Fact]
        public async Task DeactivateArticleAsync_DeactivatesArticle()
        {
            // Arrange
            await SeedDatabase();
            using var context = CreateContext();
            var service = new ArticleService(context);
            
            // Act
            var result = await service.DeactivateArticleAsync(1);
            
            // Assert
            Assert.True(result);
            
            // Vérifier que l'article a bien été désactivé
            var article = await service.GetArticleByIdAsync(1);
            Assert.False(article.IsActive);
        }
        
        [Fact]
        public async Task GetArticlesByCategoryAsync_ReturnsArticlesInCategory()
        {
            // Arrange
            await SeedDatabase();
            using var context = CreateContext();
            var service = new ArticleService(context);
            
            // Act
            var result = await service.GetArticlesByCategoryAsync(1);
            
            // Assert
            Assert.Equal(2, result.Count()); // Seulement les articles actifs
            Assert.All(result, article => 
            {
                Assert.Equal(1, article.CategoryId);
                Assert.True(article.IsActive);
            });
        }
        
        [Fact]
        public async Task GetArticlesByUserAsync_ReturnsArticlesByUser()
        {
            // Arrange
            await SeedDatabase();
            using var context = CreateContext();
            var service = new ArticleService(context);
            
            // Act
            var result = await service.GetArticlesByUserAsync(1);
            
            // Assert
            Assert.Equal(3, result.Count()); // Tous les articles de l'utilisateur
            Assert.All(result, article => Assert.Equal(1, article.UserId));
        }
    }
}