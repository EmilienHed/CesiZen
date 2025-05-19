using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CesiZen.Data;
using CesiZen.Models;
using CesiZen.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;

namespace Backend.Tests.Controllers
{
    public class UsersControllerTests
    {
        private readonly DbContextOptions<AppDbContext> _options;
        
        public UsersControllerTests()
        {
            // Utilisation d'une base de données en mémoire pour les tests
            _options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: $"UserControllerTestDb_{Guid.NewGuid()}")
                .Options;
        }
        
        private AppDbContext CreateContext()
        {
            return new AppDbContext(_options);
        }
        
        private async Task SeedDatabase()
        {
            using var context = CreateContext();
            
            // Ajouter un rôle pour les tests
            if (!await context.Role.AnyAsync())
            {
                context.Role.Add(new Role { Id = 1, Name = "User" });
                context.Role.Add(new Role { Id = 2, Name = "Admin" });
                await context.SaveChangesAsync();
            }
            
            // Ajouter des utilisateurs pour les tests
            if (!await context.Users.AnyAsync())
            {
                var users = new List<Users>
                {
                    new Users
                    {
                        IdUtilisateur = 1,
                        Nom = "Doe",
                        Prenom = "John",
                        Email = "john.doe@example.com",
                        MotDePasse = Users.HashPassword("password123"),
                        RoleId = 1,
                        DateCreation = DateTime.UtcNow
                    },
                    new Users
                    {
                        IdUtilisateur = 2,
                        Nom = "Smith",
                        Prenom = "Jane",
                        Email = "jane.smith@example.com",
                        MotDePasse = Users.HashPassword("password123"),
                        RoleId = 2,
                        DateCreation = DateTime.UtcNow
                    }
                };
                
                context.Users.AddRange(users);
                await context.SaveChangesAsync();
            }
        }
        
        [Fact]
        public async Task GetUsers_ReturnsAllUsers()
        {
            // Arrange
            await SeedDatabase();
            using var context = CreateContext();
            var controller = new UsersController(context);
            
            // Act
            var result = await controller.GetUsers();
            
            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var users = Assert.IsAssignableFrom<IEnumerable<Users>>(okResult.Value);
            Assert.Equal(2, users.Count());
        }
        
        [Fact]
        public async Task GetUserById_ReturnsUserWhenExists()
        {
            // Arrange
            await SeedDatabase();
            using var context = CreateContext();
            var controller = new UsersController(context);
            
            // Act
            var result = await controller.GetUserById(1);
            
            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var user = Assert.IsType<Users>(okResult.Value);
            Assert.Equal(1, user.IdUtilisateur);
            Assert.Equal("John", user.Prenom);
            Assert.Equal("Doe", user.Nom);
        }
        
        [Fact]
        public async Task GetUserById_ReturnsNotFoundWhenDoesNotExist()
        {
            // Arrange
            await SeedDatabase();
            using var context = CreateContext();
            var controller = new UsersController(context);
            
            // Act
            var result = await controller.GetUserById(999);
            
            // Assert
            var notFoundResult = Assert.IsType<NotFoundObjectResult>(result.Result);
            Assert.NotNull(notFoundResult.Value);
        }
        
        [Fact]
        public async Task CreateUser_CreatesNewUser()
        {
            // Arrange
            await SeedDatabase();
            using var context = CreateContext();
            var controller = new UsersController(context);
            
            var userDto = new UserCreateDto
            {
                Nom = "New",
                Prenom = "User",
                Email = "new.user@example.com",
                MotDePasse = "password123",
                DateNaissance = "1990-01-01",
                RoleId = 1
            };
            
            // Act
            var result = await controller.CreateUser(userDto);
            
            // Assert
            var createdAtResult = Assert.IsType<CreatedAtActionResult>(result.Result);
            var user = Assert.IsType<Users>(createdAtResult.Value);
            Assert.Equal("New", user.Nom);
            Assert.Equal("User", user.Prenom);
            Assert.Equal("new.user@example.com", user.Email);
            
            // Vérifier que l'utilisateur a bien été ajouté à la base de données
            var userInDb = await context.Users.FindAsync(user.IdUtilisateur);
            Assert.NotNull(userInDb);
        }
        
        [Fact]
        public async Task CreateUser_ReturnsBadRequestForExistingEmail()
        {
            // Arrange
            await SeedDatabase();
            using var context = CreateContext();
            var controller = new UsersController(context);
            
            var userDto = new UserCreateDto
            {
                Nom = "Duplicate",
                Prenom = "Email",
                Email = "john.doe@example.com", // Email déjà utilisé
                MotDePasse = "password123",
                RoleId = 1
            };
            
            // Act
            var result = await controller.CreateUser(userDto);
            
            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result.Result);
            Assert.Equal("Cet email est déjà utilisé.", badRequestResult.Value);
        }
        
        [Fact]
        public async Task UpdateUser_UpdatesExistingUser()
        {
            // Arrange
            await SeedDatabase();
            using var context = CreateContext();
            var controller = new UsersController(context);
            
            var updateDto = new UserUpdateDto
            {
                Nom = "Updated",
                Prenom = "User",
                Email = "updated.user@example.com",
                DateNaissance = "1990-01-01",
                RoleId = 1
            };
            
            // Act
            var result = await controller.UpdateUser(1, updateDto);
            
            // Assert
            Assert.IsType<ActionResult<Users>>(result);
            var actionResult = result.Result;
            var okResult = Assert.IsType<OkObjectResult>(actionResult);
            Assert.NotNull(okResult.Value);
            
            // Vérifier que l'utilisateur a bien été mis à jour dans la base de données
            var updatedUser = await context.Users.FindAsync(1);
            Assert.Equal("Updated", updatedUser.Nom);
            Assert.Equal("User", updatedUser.Prenom);
            Assert.Equal("updated.user@example.com", updatedUser.Email);
        }
        
        [Fact]
        public async Task UpdateUser_ReturnsNotFoundForNonExistentUser()
        {
            // Arrange
            await SeedDatabase();
            using var context = CreateContext();
            var controller = new UsersController(context);
            
            var updateDto = new UserUpdateDto
            {
                Nom = "Updated",
                Prenom = "User",
                Email = "updated.user@example.com",
                RoleId = 1
            };
            
            // Act
            var result = await controller.UpdateUser(999, updateDto);
            
            // Assert
            Assert.IsType<ActionResult<Users>>(result);
            var actionResult = result.Result;
            var notFoundResult = Assert.IsType<NotFoundObjectResult>(actionResult);
            Assert.NotNull(notFoundResult.Value);
        }
        
        [Fact]
        public async Task ChangePassword_ChangesPassword()
        {
            // Arrange
            await SeedDatabase();
            using var context = CreateContext();
            var controller = new UsersController(context);
            
            var passwordDto = new ChangePasswordDto
            {
                NewPassword = "newpassword123"
            };
            
            // Act
            var result = await controller.ChangePassword(1, passwordDto);
            
            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.NotNull(okResult.Value);
            
            // Vérifier que le mot de passe a bien été changé
            var updatedUser = await context.Users.FindAsync(1);
            var isNewPasswordCorrect = Users.VerifyPassword("newpassword123", updatedUser.MotDePasse);
            Assert.True(isNewPasswordCorrect);
        }
        
        [Fact]
        public async Task DeleteUser_DeletesUser()
        {
            // Arrange
            await SeedDatabase();
            using var context = CreateContext();
            var controller = new UsersController(context);
            
            // Act
            var result = await controller.DeleteUser(1);
            
            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.NotNull(okResult.Value);
            
            // Vérifier que l'utilisateur a bien été supprimé de la base de données
            var deletedUser = await context.Users.FindAsync(1);
            Assert.Null(deletedUser);
        }
        
        [Fact]
        public async Task DeleteUser_ReturnsNotFoundForNonExistentUser()
        {
            // Arrange
            await SeedDatabase();
            using var context = CreateContext();
            var controller = new UsersController(context);
            
            // Act
            var result = await controller.DeleteUser(999);
            
            // Assert
            var notFoundResult = Assert.IsType<NotFoundObjectResult>(result);
            Assert.NotNull(notFoundResult.Value);
        }
    }
}