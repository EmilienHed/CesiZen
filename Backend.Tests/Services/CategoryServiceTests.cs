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
    public class CategoryServiceTests
    {
        private readonly DbContextOptions<AppDbContext> _options;
        
        public CategoryServiceTests()
        {
            // Utilisation d'une base de données en mémoire pour les tests
            _options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: $"CategoryTestDb_{Guid.NewGuid()}")
                .Options;
        }
        
        private AppDbContext CreateContext()
        {
            return new AppDbContext(_options);
        }
        
        private async Task SeedDatabase()
        {
            using var context = CreateContext();
            
            // Ajouter des catégories pour les tests
            var categories = new List<Category>
            {
                new Category
                {
                    Id = 1,
                    Name = "Category 1",
                    Description = "Description 1",
                    IsActive = true
                },
                new Category
                {
                    Id = 2,
                    Name = "Category 2",
                    Description = "Description 2",
                    IsActive = true
                },
                new Category
                {
                    Id = 3,
                    Name = "Inactive Category",
                    Description = "Inactive Description",
                    IsActive = false
                }
            };
            
            context.Categories.AddRange(categories);
            await context.SaveChangesAsync();
        }
        
        [Fact]
        public async Task GetAllCategoriesAsync_ReturnsAllCategories()
        {
            // Arrange
            await SeedDatabase();
            using var context = CreateContext();
            var service = new CategoryService(context);
            
            // Act
            var result = await service.GetAllCategoriesAsync();
            
            // Assert
            Assert.Equal(3, result.Count());
        }
        
        [Fact]
        public async Task GetActiveCategoriesAsync_ReturnsOnlyActiveCategories()
        {
            // Arrange
            await SeedDatabase();
            using var context = CreateContext();
            var service = new CategoryService(context);
            
            // Act
            var result = await service.GetActiveCategoriesAsync();
            
            // Assert
            Assert.Equal(2, result.Count());
            Assert.All(result, category => Assert.True(category.IsActive));
        }
        
        [Fact]
        public async Task GetCategoryByIdAsync_ReturnsCorrectCategory()
        {
            // Arrange
            await SeedDatabase();
            using var context = CreateContext();
            var service = new CategoryService(context);
            
            // Act
            var result = await service.GetCategoryByIdAsync(1);
            
            // Assert
            Assert.NotNull(result);
            Assert.Equal("Category 1", result.Name);
        }
        
        [Fact]
        public async Task CreateCategoryAsync_CreatesNewCategory()
        {
            // Arrange
            await SeedDatabase();
            using var context = CreateContext();
            var service = new CategoryService(context);
            
            var newCategory = new Category
            {
                Name = "New Category",
                Description = "New Description",
                IsActive = true
            };
            
            // Act
            var result = await service.CreateCategoryAsync(newCategory);
            
            // Assert
            Assert.NotNull(result);
            Assert.Equal("New Category", result.Name);
            Assert.NotEqual(0, result.Id);
            
            // Vérifier que la catégorie a bien été ajoutée à la base de données
            var categories = await service.GetAllCategoriesAsync();
            Assert.Equal(4, categories.Count());
        }
        
        [Fact]
        public async Task UpdateCategoryAsync_UpdatesExistingCategory()
        {
            // Arrange
            await SeedDatabase();
            using var context = CreateContext();
            var service = new CategoryService(context);
            
            var category = await service.GetCategoryByIdAsync(1);
            category.Name = "Updated Name";
            category.Description = "Updated Description";
            
            // Act
            var result = await service.UpdateCategoryAsync(category);
            
            // Assert
            Assert.NotNull(result);
            Assert.Equal("Updated Name", result.Name);
            Assert.Equal("Updated Description", result.Description);
            
            // Vérifier que la catégorie a bien été mise à jour dans la base de données
            var updatedCategory = await service.GetCategoryByIdAsync(1);
            Assert.Equal("Updated Name", updatedCategory.Name);
        }
        
        [Fact]
        public async Task DeleteCategoryAsync_DeletesCategory()
        {
            // Arrange
            await SeedDatabase();
            using var context = CreateContext();
            var service = new CategoryService(context);
            
            // Act
            var result = await service.DeleteCategoryAsync(1);
            
            // Assert
            Assert.True(result);
            
            // Vérifier que la catégorie a bien été supprimée de la base de données
            var categories = await service.GetAllCategoriesAsync();
            Assert.Equal(2, categories.Count());
            Assert.DoesNotContain(categories, c => c.Id == 1);
        }
        
        [Fact]
        public async Task DeleteCategoryAsync_ReturnsFalseWhenCategoryHasArticles()
        {
            // Arrange
            await SeedDatabase();
            using var context = CreateContext();
            
            // Ajouter un article qui utilise la catégorie
            context.Articles.Add(new Article
            {
                Id = 1,
                Title = "Test Article",
                Content = "Test Content",
                UserId = 1,
                CategoryId = 1,
                IsActive = true,
                ImageUrl = "test.jpg" // Ajouter cette ligne
            });
            await context.SaveChangesAsync();
            
            var service = new CategoryService(context);
            
            // Act
            var result = await service.DeleteCategoryAsync(1);
            
            // Assert
            Assert.False(result); // Ne devrait pas pouvoir supprimer une catégorie utilisée
            
            // Vérifier que la catégorie n'a pas été supprimée
            var categories = await service.GetAllCategoriesAsync();
            Assert.Equal(3, categories.Count());
            Assert.Contains(categories, c => c.Id == 1);
        }
        
        [Fact]
        public async Task DeactivateCategoryAsync_DeactivatesCategory()
        {
            // Arrange
            await SeedDatabase();
            using var context = CreateContext();
            var service = new CategoryService(context);
            
            // Act
            var result = await service.DeactivateCategoryAsync(1);
            
            // Assert
            Assert.True(result);
            
            // Vérifier que la catégorie a bien été désactivée
            var category = await service.GetCategoryByIdAsync(1);
            Assert.False(category.IsActive);
        }
    }
}