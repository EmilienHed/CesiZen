using System.Threading.Tasks;
using CesiZen.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace Backend.Tests.Controllers
{
    public class AuthControllerTests
    {
        private readonly Mock<IAuthService> _mockAuthService;
        private readonly AuthController _controller;
        
        public AuthControllerTests()
        {
            _mockAuthService = new Mock<IAuthService>();
            _controller = new AuthController(_mockAuthService.Object);
        }
        
        [Fact]
        public async Task Login_ReturnsOkWithTokenForValidCredentials()
        {
            // Arrange
            var loginRequest = new LoginRequest
            {
                Email = "test@example.com",
                Password = "password123"
            };
            
            var loginResponse = new LoginResponse
            {
                UserId = 1,
                Token = "valid_token",
                UserName = "Test User",
                Role = "User"
            };
            
            _mockAuthService.Setup(s => s.Login(It.IsAny<LoginRequest>()))
                .ReturnsAsync(loginResponse);
            
            // Act
            var result = await _controller.Login(loginRequest);
            
            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnedResponse = Assert.IsType<LoginResponse>(okResult.Value);
            Assert.Equal(1, returnedResponse.UserId);
            Assert.Equal("valid_token", returnedResponse.Token);
        }
        
        [Fact]
        public async Task Login_ReturnsUnauthorizedForInvalidCredentials()
        {
            // Arrange
            var loginRequest = new LoginRequest
            {
                Email = "test@example.com",
                Password = "wrongpassword"
            };
            
            _mockAuthService.Setup(s => s.Login(It.IsAny<LoginRequest>()))
                .ReturnsAsync((LoginResponse)null);
            
            // Act
            var result = await _controller.Login(loginRequest);
            
            // Assert
            var unauthorizedResult = Assert.IsType<UnauthorizedObjectResult>(result);
            Assert.NotNull(unauthorizedResult.Value);
        }
        
        [Fact]
        public async Task Login_ReturnsBadRequestForInvalidModel()
        {
            // Arrange
            var loginRequest = new LoginRequest
            {
                // Email manquant
                Password = "password123"
            };
            
            // Ajouter une erreur de validation au ModelState
            _controller.ModelState.AddModelError("Email", "Email is required");
            
            // Act
            var result = await _controller.Login(loginRequest);
            
            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
        }
    }
}