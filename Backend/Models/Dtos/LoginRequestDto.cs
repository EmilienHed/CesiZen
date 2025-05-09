/*using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;*/
using System.ComponentModel.DataAnnotations;

namespace CesiZen.Models.DTOs
{
    public class LoginRequest
    {
        [Required] public string Email { get; set; }

        [Required] public string Password { get; set; }
    }

    public class LoginResponse
    {
        public int UserId { get; set; }
        public string Token { get; set; }
        public string UserName { get; set; }
        public string Role { get; set; }
        public DateTime Expiration { get; set; }
    }
}