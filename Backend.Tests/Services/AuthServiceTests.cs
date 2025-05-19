using System;
using System.Threading.Tasks;
using CesiZen.Data;
using CesiZen.Models;
using CesiZen.Models.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Moq;
using Xunit;

namespace Backend.Tests.Services
{
    public class AuthServiceTests
    {
        private readonly DbContextOptions<AppDbContext> _options;
        private readonly Mock<IConfiguration> _mockConfiguration;
        
        public AuthServiceTests()
        {
            // Configuration pour les JWT
            _mockConfiguration = new Mock<IConfiguration>();
            _mockConfiguration.Setup(c => c["Jwt:Key"]).Returns("this_is_a_very_secure_key_for_tests_only_1234567890");
            _mockConfiguration.Setup(c => c["Jwt:Issuer"]).Returns("test_issuer");
            _mockConfiguration.Setup(c => c["Jwt:Audience"]).Returns("test_audience");
            
            // Utilisation d'une base de données en mémoire pour les tests
            _options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: $"AuthTestDb_{Guid.NewGuid()}")
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
            var role = new Role
            {
                Id = 1,
                Name = "User"
            };
            
            var adminRole = new Role
            {
                Id = 2,
                Name = "Admin"
            };
            
            // Ajouter un utilisateur pour les tests
            var password = "password123";
            var hashedPassword = Users.HashPassword(password);
            
            var user = new Users
            {
                IdUtilisateur = 1,
                Nom = "Doe",
                Prenom = "John",
                Email = "john.doe@example.com",
                MotDePasse = hashedPassword,
                RoleId = 1
            };
            
            var adminUser = new Users
            {
                IdUtilisateur = 2,
                Nom = "Admin",
                Prenom = "Super",
                Email = "admin@example.com",
                MotDePasse = hashedPassword,
                RoleId = 2
            };
            
            context.Role.Add(role);
            context.Role.Add(adminRole);
            await context.SaveChangesAsync();
            
            context.Users.Add(user);
            context.Users.Add(adminUser);
            await context.SaveChangesAsync();
        }
        
        [Fact]
        public async Task Login_ReturnsTokenForValidCredentials()
        {
            // Arrange
            await SeedDatabase();
            using var context = CreateContext();
            var service = new AuthService(context, _mockConfiguration.Object);
            
            var loginRequest = new LoginRequest
            {
                Email = "john.doe@example.com",
                Password = "password123"
            };
            
            // Act
            var result = await service.Login(loginRequest);
            
            // Assert
            Assert.NotNull(result);
            Assert.Equal(1, result.UserId);
            Assert.Equal("John Doe", result.UserName);
            Assert.Equal("User", result.Role);
            Assert.NotNull(result.Token);
            Assert.True(result.Expiration > DateTime.UtcNow);
        }
        
        [Fact]
        public async Task Login_ReturnsNullForInvalidEmail()
        {
            // Arrange
            await SeedDatabase();
            using var context = CreateContext();
            var service = new AuthService(context, _mockConfiguration.Object);
            
            var loginRequest = new LoginRequest
            {
                Email = "invalid@example.com",
                Password = "password123"
            };
            
            // Act
            var result = await service.Login(loginRequest);
            
            // Assert
            Assert.Null(result);
        }
        
        [Fact]
        public async Task Login_ReturnsNullForInvalidPassword()
        {
            // Arrange
            await SeedDatabase();
            using var context = CreateContext();
            var service = new AuthService(context, _mockConfiguration.Object);
            
            var loginRequest = new LoginRequest
            {
                Email = "john.doe@example.com",
                Password = "wrongpassword"
            };
            
            // Act
            var result = await service.Login(loginRequest);
            
            // Assert
            Assert.Null(result);
        }
        
        [Fact]
        public async Task IsAdmin_ReturnsTrueForAdminUser()
        {
            // Arrange
            await SeedDatabase();
            using var context = CreateContext();
            var service = new AuthService(context, _mockConfiguration.Object);
            
            var user = await context.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Email == "admin@example.com");
            
            // Act
            var result = service.IsAdmin(user);
            
            // Assert
            Assert.True(result);
        }
        
        [Fact]
        public async Task IsAdmin_ReturnsFalseForNonAdminUser()
        {
            // Arrange
            await SeedDatabase();
            using var context = CreateContext();
            var service = new AuthService(context, _mockConfiguration.Object);
            
            var user = await context.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Email == "john.doe@example.com");
            
            // Act
            var result = service.IsAdmin(user);
            
            // Assert
            Assert.False(result);
        }
        
        [Fact]
        public async Task GetCurrentUser_ReturnsCorrectUser()
        {
            // Arrange
            await SeedDatabase();
            using var context = CreateContext();
            var service = new AuthService(context, _mockConfiguration.Object);
            
            // Act
            var result = await service.GetCurrentUser(1);
            
            // Assert
            Assert.NotNull(result);
            Assert.Equal("john.doe@example.com", result.Email);
            Assert.Equal("John", result.Prenom);
            Assert.Equal("Doe", result.Nom);
        }
        
        [Fact]
        public async Task GetCurrentUser_ReturnsNullForNonExistentUser()
        {
            // Arrange
            await SeedDatabase();
            using var context = CreateContext();
            var service = new AuthService(context, _mockConfiguration.Object);
            
            // Act
            var result = await service.GetCurrentUser(999);
            
            // Assert
            Assert.Null(result);
        }
        
        [Fact]
        public void VerifyPassword_ReturnsTrueForCorrectPassword()
        {
            // Arrange
            var password = "testPassword";
            var hashedPassword = Users.HashPassword(password);
            
            // Act
            var result = AuthService.VerifyPassword(password, hashedPassword);
            
            // Assert
            Assert.True(result);
        }
        
        [Fact]
        public void VerifyPassword_ReturnsFalseForIncorrectPassword()
        {
            // Arrange
            var password = "testPassword";
            var wrongPassword = "wrongPassword";
            var hashedPassword = Users.HashPassword(password);
            
            // Act
            var result = AuthService.VerifyPassword(wrongPassword, hashedPassword);
            
            // Assert
            Assert.False(result);
        }
    }
}