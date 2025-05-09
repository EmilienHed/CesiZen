namespace CesiZen.Models.DTOs // ✅ Correspond au bon namespace
{
    public class UserCreateDto
    {
        public string Nom { get; set; }
        public string Prenom { get; set; }
        public string Email { get; set; }
        public string MotDePasse { get; set; }
        public string DateNaissance { get; set; }
        public int RoleId { get; set; }
    }
}