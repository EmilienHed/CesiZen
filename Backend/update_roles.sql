-- Désactiver temporairement les contraintes de clés étrangères
ALTER TABLE "Users" DROP CONSTRAINT "FK_Users_Role_RoleId";
ALTER TABLE "Articles" DROP CONSTRAINT "FK_Articles_Users_UserId";

-- Modifications temporaires pour éviter les conflits
UPDATE "Role" SET "Id" = 100 WHERE "Id" = 1; -- Admin -> 100 (temporaire)
UPDATE "Role" SET "Id" = 101 WHERE "Id" = 2; -- User -> 101 (temporaire)
UPDATE "Role" SET "Id" = 102 WHERE "Id" = 3; -- Auteur -> 102 (temporaire)

-- Mettre à jour les utilisateurs pour utiliser les IDs temporaires
UPDATE "Users" SET "RoleId" = 100 WHERE "RoleId" = 1;
UPDATE "Users" SET "RoleId" = 101 WHERE "RoleId" = 2;
UPDATE "Users" SET "RoleId" = 102 WHERE "RoleId" = 3;

-- Mettre à jour les rôles avec les nouveaux IDs
UPDATE "Role" SET "Id" = 0 WHERE "Id" = 100; -- Admin -> 0
UPDATE "Role" SET "Id" = 1 WHERE "Id" = 101; -- User -> 1
-- Laisser Auteur comme 102 pour l'instant

-- Mettre l'utilisateur admin@cesizen.fr en role 0 (Admin)
UPDATE "Users" SET "RoleId" = 0 WHERE "Email" = 'admin@cesizen.fr';
UPDATE "Users" SET "RoleId" = 0 WHERE "Email" = 'philippe.roux@cesizen.fr';
UPDATE "Users" SET "RoleId" = 0 WHERE "Email" = 'marie.henry@cesizen.fr';

-- Mettre tous les autres utilisateurs en role 1 (User)
UPDATE "Users" SET "RoleId" = 1 WHERE "RoleId" = 101 OR "RoleId" = 102;

-- Supprimer le rôle Auteur qui n'est plus utilisé
DELETE FROM "Role" WHERE "Id" = 102;

-- Restaurer les contraintes de clés étrangères
ALTER TABLE "Users" ADD CONSTRAINT "FK_Users_Role_RoleId" FOREIGN KEY ("RoleId") REFERENCES "Role"("Id") ON DELETE CASCADE;
ALTER TABLE "Articles" ADD CONSTRAINT "FK_Articles_Users_UserId" FOREIGN KEY ("UserId") REFERENCES "Users"("IdUtilisateur") ON DELETE CASCADE; 