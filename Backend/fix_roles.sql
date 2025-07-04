-- Vérifier l'état actuel
SELECT * FROM "Role";
SELECT DISTINCT "RoleId" FROM "Users";

-- Désactiver temporairement les contraintes de clés étrangères
ALTER TABLE "Users" DROP CONSTRAINT IF EXISTS "FK_Users_Role_RoleId";
ALTER TABLE "Articles" DROP CONSTRAINT IF EXISTS "FK_Articles_Users_UserId";
ALTER TABLE "RespirationExercises" DROP CONSTRAINT IF EXISTS "FK_RespirationExercises_Users_UsersIdUtilisateur";

-- Mettre tous les utilisateurs temporairement dans un rôle temporaire
UPDATE "Users" SET "RoleId" = 999;

-- Supprimer tous les rôles existants
DELETE FROM "Role";

-- Créer les nouveaux rôles avec les bons IDs
INSERT INTO "Role" ("Id", "Name") VALUES (0, 'Admin');
INSERT INTO "Role" ("Id", "Name") VALUES (1, 'User');

-- Mettre l'utilisateur admin@cesizen.fr en role 0 (Admin)
UPDATE "Users" SET "RoleId" = 0 WHERE "Email" = 'admin@cesizen.fr';
UPDATE "Users" SET "RoleId" = 0 WHERE "Email" = 'philippe.roux@cesizen.fr';
UPDATE "Users" SET "RoleId" = 0 WHERE "Email" = 'marie.henry@cesizen.fr';

-- Mettre tous les autres utilisateurs en role 1 (User)
UPDATE "Users" SET "RoleId" = 1 WHERE "RoleId" = 999;

-- Restaurer les contraintes de clés étrangères
ALTER TABLE "Users" ADD CONSTRAINT "FK_Users_Role_RoleId" FOREIGN KEY ("RoleId") REFERENCES "Role"("Id") ON DELETE CASCADE;
ALTER TABLE "Articles" ADD CONSTRAINT "FK_Articles_Users_UserId" FOREIGN KEY ("UserId") REFERENCES "Users"("IdUtilisateur") ON DELETE CASCADE;
ALTER TABLE "RespirationExercises" ADD CONSTRAINT "FK_RespirationExercises_Users_UsersIdUtilisateur" FOREIGN KEY ("UsersIdUtilisateur") REFERENCES "Users"("IdUtilisateur");

-- Vérifier le résultat final
SELECT * FROM "Role";
SELECT COUNT(*) AS "Admins" FROM "Users" WHERE "RoleId" = 0;
SELECT COUNT(*) AS "Users" FROM "Users" WHERE "RoleId" = 1; 