/*namespace CesiZen.Data;

using Microsoft.EntityFrameworkCore;
using CesiZen.Models;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    public DbSet<User> User { get; set; }
    public DbSet<ExerciceRespiratoire> ExercicesRespiratoires { get; set; }
}*/


namespace CesiZen.Data;

using Microsoft.EntityFrameworkCore;
using CesiZen.Models;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    //public DbSet<Users> Users { get; set; } // Mets-le au pluriel pour être standard
    public DbSet<Users> Users { get; set; } // Utilise bien "User" au singulier
    public DbSet<ExerciceRespiratoire> ExercicesRespiratoires { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Users>().ToTable("Users"); // Renomme la table pour PostgreSQL
    }
}