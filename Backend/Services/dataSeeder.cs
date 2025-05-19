using CesiZen.Data;
using CesiZen.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CesiZen.Services
{
    public static class DataSeeder
    {
        public static async Task SeedData(IServiceProvider serviceProvider)
        {
            using var scope = serviceProvider.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

            // Appliquer les migrations en attente
            await context.Database.MigrateAsync();

            // Exécuter les méthodes de seeding dans l'ordre pour respecter les dépendances
            await SeedRoles(context);
            await SeedUsers(context);
            await SeedCategories(context);
            await SeedArticles(context);

            Console.WriteLine("Base de données initialisée avec succès !");
        }

        private static async Task SeedRoles(AppDbContext context)
        {
            if (await context.Role.AnyAsync())
            {
                return; // Les rôles existent déjà
            }

            var roles = new List<Role>
            {
                new Role { Name = "Admin" },
                new Role { Name = "User" },
                new Role { Name = "Auteur" }
            };

            await context.Role.AddRangeAsync(roles);
            await context.SaveChangesAsync();
            Console.WriteLine("Rôles ajoutés !");
        }

        private static async Task SeedUsers(AppDbContext context)
        {
            if (await context.Users.AnyAsync())
            {
                return; // Les utilisateurs existent déjà
            }

            // Récupérer les IDs des rôles
            var adminRoleId = await context.Role.Where(r => r.Name == "Admin").Select(r => r.Id).FirstOrDefaultAsync();
            var userRoleId = await context.Role.Where(r => r.Name == "User").Select(r => r.Id).FirstOrDefaultAsync();
            var auteurRoleId = await context.Role.Where(r => r.Name == "Auteur").Select(r => r.Id).FirstOrDefaultAsync();

            var users = new List<Users>
            {
                new Users
                {
                    Nom = "Admin",
                    Prenom = "Super",
                    Email = "admin@cesizen.fr",
                    MotDePasse = Users.HashPassword("Admin123!"),
                    DateNaissance = "1990-01-01",
                    RoleId = adminRoleId,
                    DateCreation = DateTime.UtcNow,
                    DateDerniereConnexion = DateTime.UtcNow
                },
                new Users
                {
                    Nom = "User",
                    Prenom = "Test",
                    Email = "user@cesizen.fr",
                    MotDePasse = Users.HashPassword("User123!"),
                    DateNaissance = "1995-05-15",
                    RoleId = userRoleId,
                    DateCreation = DateTime.UtcNow,
                    DateDerniereConnexion = DateTime.UtcNow
                }
            };

            // Ajouter 20 utilisateurs aléatoires
            var random = new Random();
            var lastNames = new[] { "Martin", "Dubois", "Thomas", "Robert", "Petit", "Leroy", "Moreau", "Simon", "Laurent", "Lefebvre", "Michel", "Garcia", "David", "Bernard", "Guerin", "Blanc", "Lambert", "Dupont", "Roy", "Girard" };
            var firstNames = new[] { "Emma", "Lucas", "Léa", "Hugo", "Manon", "Liam", "Jade", "Louis", "Chloé", "Jules", "Eva", "Noah", "Alice", "Gabriel", "Inès", "Arthur", "Zoé", "Raphaël", "Juliette", "Adam" };
            
            for (int i = 0; i < 20; i++)
            {
                var lastName = lastNames[random.Next(lastNames.Length)];
                var firstName = firstNames[random.Next(firstNames.Length)];
                var email = $"{firstName.ToLower()}.{lastName.ToLower()}{random.Next(100)}@example.com";
                // Attribuer le rôle Auteur à certains utilisateurs (1 sur 3)
                var roleId = i % 3 == 0 ? auteurRoleId : userRoleId;

                var birthYear = random.Next(1970, 2000);
                var birthMonth = random.Next(1, 13);
                var birthDay = random.Next(1, 28);
                var birthDate = $"{birthYear}-{birthMonth:D2}-{birthDay:D2}";

                users.Add(new Users
                {
                    Nom = lastName,
                    Prenom = firstName,
                    Email = email,
                    MotDePasse = Users.HashPassword("Password123!"),
                    DateNaissance = birthDate,
                    RoleId = roleId,
                    DateCreation = DateTime.UtcNow.AddDays(-random.Next(1, 365)),
                    DateDerniereConnexion = random.Next(0, 2) == 0 ? DateTime.UtcNow.AddDays(-random.Next(0, 30)) : null
                });
            }

            await context.Users.AddRangeAsync(users);
            await context.SaveChangesAsync();
            Console.WriteLine("Utilisateurs ajoutés !");
        }

        private static async Task SeedCategories(AppDbContext context)
        {
            if (await context.Categories.AnyAsync())
            {
                return; // Les catégories existent déjà
            }

            var categories = new List<Category>
            {
                new Category { Name = "Bien-être", Description = "Articles sur le bien-être et la santé mentale", IsActive = true },
                new Category { Name = "Méditation", Description = "Techniques de méditation et conseils pratiques", IsActive = true },
                new Category { Name = "Respiration", Description = "Exercices de respiration et leurs bienfaits", IsActive = true },
                new Category { Name = "Mindfulness", Description = "Pratiques de pleine conscience au quotidien", IsActive = true },
                new Category { Name = "Yoga", Description = "Postures et philosophie du yoga", IsActive = true },
                new Category { Name = "Santé", Description = "Conseils pour prendre soin de sa santé physique et mentale", IsActive = true },
                new Category { Name = "Sommeil", Description = "Améliorer la qualité de son sommeil", IsActive = true },
                new Category { Name = "Relaxation", Description = "Techniques de relaxation et de gestion du stress", IsActive = true },
                new Category { Name = "Nutrition", Description = "Alimentation équilibrée pour le corps et l'esprit", IsActive = true },
                new Category { Name = "Développement personnel", Description = "Ressources pour grandir et s'épanouir", IsActive = true }
            };

            await context.Categories.AddRangeAsync(categories);
            await context.SaveChangesAsync();
            Console.WriteLine("Catégories ajoutées !");
        }

        private static async Task SeedArticles(AppDbContext context)
        {
            if (await context.Articles.AnyAsync())
            {
                return; // Les articles existent déjà
            }

            // Récupérer les IDs des catégories
            var categories = await context.Categories.ToListAsync();
            
            // Récupérer les utilisateurs qui sont auteurs ou admins
            var auteurs = await context.Users
                .Where(u => u.Role.Name == "Auteur" || u.Role.Name == "Admin")
                .ToListAsync();

            if (!auteurs.Any())
            {
                Console.WriteLine("Aucun auteur trouvé, impossible de créer des articles.");
                return;
            }

            var random = new Random();
            var articles = new List<Article>();

            // Exemples d'URL d'images
            var imageUrls = new[]
            {
                "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
                "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b",
                "https://images.unsplash.com/photo-1593164842264-854604db2260",
                "https://images.unsplash.com/photo-1616699002805-0741e1e4a9c5",
                "https://images.unsplash.com/photo-1602192509154-0b900ee1f851",
                "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
                "https://images.unsplash.com/photo-1465101162946-4377e57745c3",
                "https://images.unsplash.com/photo-1499209974431-9dddcece7f88",
                "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7",
                "https://images.unsplash.com/photo-1563178406-4cdc2923acbc"
            };

            // Titres d'articles prédéfinis par catégorie
            var articleTitles = new Dictionary<string, List<string>>
            {
                { "Bien-être", new List<string> { 
                    "5 habitudes quotidiennes pour améliorer votre bien-être", 
                    "Comment cultiver la gratitude au quotidien", 
                    "Les bienfaits de la marche sur votre santé mentale",
                    "Trouver l'équilibre entre vie professionnelle et personnelle",
                    "L'importance du repos dans un monde hyperconnecté" 
                }},
                { "Méditation", new List<string> { 
                    "Débuter la méditation : guide pour les débutants", 
                    "Les différents types de méditation et leurs effets", 
                    "Comment intégrer la méditation dans une vie active",
                    "Méditation guidée : pourquoi et comment",
                    "Les preuves scientifiques des bienfaits de la méditation" 
                }},
                { "Respiration", new List<string> { 
                    "La technique de respiration 4-7-8 pour calmer l'anxiété", 
                    "Respiration consciente : un outil contre le stress", 
                    "5 exercices de respiration pour retrouver son calme",
                    "Comment la respiration influence notre état émotionnel",
                    "Respiration carrée : technique simple et efficace" 
                }},
                { "Mindfulness", new List<string> { 
                    "La pleine conscience au travail : améliorer sa concentration", 
                    "Exercices simples de pleine conscience pour débutants", 
                    "Comment la pleine conscience change votre cerveau",
                    "Pratiquer la pleine conscience avec les enfants",
                    "Pleine conscience et gestion des émotions difficiles" 
                }},
                { "Yoga", new List<string> { 
                    "Le yoga pour débutants : par où commencer", 
                    "Les différents styles de yoga et leurs bienfaits", 
                    "5 postures de yoga pour soulager le mal de dos",
                    "Comment le yoga peut améliorer votre sommeil",
                    "Yoga et respiration : le pouvoir du pranayama" 
                }},
                { "Santé", new List<string> { 
                    "Renforcer son système immunitaire naturellement", 
                    "L'importance de l'hydratation pour votre santé", 
                    "Comment réduire l'inflammation dans le corps",
                    "Les bienfaits insoupçonnés du contact avec la nature",
                    "Gérer les maux de tête sans médicaments" 
                }},
                { "Sommeil", new List<string> { 
                    "7 conseils pour un sommeil réparateur", 
                    "Comment créer une routine du soir efficace", 
                    "L'impact des écrans sur la qualité du sommeil",
                    "Techniques de relaxation pour mieux s'endormir",
                    "Comprendre les cycles du sommeil" 
                }},
                { "Relaxation", new List<string> { 
                    "Techniques de relaxation musculaire progressive", 
                    "Le pouvoir des bains de forêt pour se ressourcer", 
                    "Comment créer un espace de détente chez soi",
                    "L'art de ne rien faire : découvrir le 'niksen'",
                    "Relaxation sonore : utiliser les sons pour apaiser l'esprit" 
                }},
                { "Nutrition", new List<string> { 
                    "Les aliments qui favorisent la bonne humeur", 
                    "L'importance du petit-déjeuner pour votre journée", 
                    "Comment les probiotiques influencent votre humeur",
                    "Manger en pleine conscience : redécouvrir le plaisir des repas",
                    "Les super-aliments pour booster votre énergie" 
                }},
                { "Développement personnel", new List<string> { 
                    "Comment identifier et utiliser ses forces personnelles", 
                    "Cultiver la résilience face aux défis quotidiens", 
                    "Le pouvoir des affirmations positives",
                    "Comment sortir de sa zone de confort",
                    "Fixer des objectifs qui ont du sens" 
                }}
            };

            // Contenu d'exemple pour les articles (paragraphes)
            var contentParagraphs = new List<string>
            {
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.",
                
                "Proin dapibus justo eu lectus dictum, a commodo risus venenatis. Quisque consequat leo at lacus lacinia hendrerit. Sed id ex ac lacus vulputate congue vel ac orci. Vivamus gravida, sem ut egestas auctor, turpis eros faucibus sem, non commodo velit odio at magna. Praesent eget nisl vel risus commodo tempus sit amet vel nulla.",
                
                "Suspendisse potenti. Donec congue tortor vel arcu sagittis, vel faucibus ante elementum. Phasellus ut neque eget nisi faucibus malesuada. Aenean id eros at purus porta iaculis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer non dui magna.",
                
                "Mauris sed neque sed nisi tempor euismod. Integer id nisi vel tellus malesuada vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ac quam vel ligula fermentum tincidunt. Nullam auctor velit vel dolor varius, a ultrices ipsum tempor. Proin volutpat, eros vel fermentum tempor, nunc ex fermentum magna, nec fermentum magna quam vel magna.",
                
                "Fusce sit amet magna vitae magna ultricies ultricies. Sed euismod, magna vitae magna ultricies ultricies, magna magna ultricies magna, vitae magna ultricies magna magna magna ultricies. Sed euismod, magna vitae magna ultricies ultricies, magna magna ultricies magna, vitae magna ultricies magna magna magna ultricies.",
                
                "Etiam consequat, sem et vulputate finibus, orci ex tempus sem, in vulputate sem risus at sem. Cras eget magna vitae magna ultricies ultricies. Sed euismod, magna vitae magna ultricies ultricies, magna magna ultricies magna, vitae magna ultricies magna magna magna ultricies."
            };

            // Générer 50 articles
            for (int i = 0; i < 50; i++)
            {
                // Sélectionner une catégorie aléatoire
                var category = categories[random.Next(categories.Count)];
                
                // Sélectionner un auteur aléatoire
                var auteur = auteurs[random.Next(auteurs.Count)];
                
                // Sélectionner un titre de la catégorie
                var titlesForCategory = articleTitles[category.Name];
                var title = titlesForCategory[random.Next(titlesForCategory.Count)];
                
                // Pour éviter les doublons, ajouter un identifiant au titre si nécessaire
                if (i > titlesForCategory.Count)
                {
                    title += $" - Version {i / titlesForCategory.Count + 1}";
                }
                
                // Construire le contenu de l'article avec 3 à 6 paragraphes
                var paragraphCount = random.Next(3, 7);
                var content = string.Join("\n\n", contentParagraphs.OrderBy(x => random.Next()).Take(paragraphCount));
                
                // Déterminer la date de création (entre 1 jour et 1 an dans le passé)
                var daysAgo = random.Next(1, 365);
                var createdAt = DateTime.UtcNow.AddDays(-daysAgo);
                
                // Déterminer si l'article a été mis à jour (30% de chance)
                DateTime? updatedAt = random.Next(0, 10) < 3 ? createdAt.AddDays(random.Next(1, Math.Min(30, daysAgo))) : null;
                
                // Déterminer si l'article est actif (90% de chance)
                var isActive = random.Next(0, 10) < 9;
                
                // Sélectionner une image aléatoire
                var imageUrl = imageUrls[random.Next(imageUrls.Length)];
                
                articles.Add(new Article
                {
                    Title = title,
                    Content = content,
                    ImageUrl = imageUrl,
                    CreatedAt = createdAt,
                    UpdatedAt = updatedAt,
                    IsActive = isActive,
                    UserId = auteur.IdUtilisateur,
                    CategoryId = category.Id
                });
            }

            await context.Articles.AddRangeAsync(articles);
            await context.SaveChangesAsync();
            Console.WriteLine("Articles ajoutés !");
        }
    }
}