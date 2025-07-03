-- Script de réinitialisation de la base de données
TRUNCATE TABLE "Articles" CASCADE;
TRUNCATE TABLE "Categories" CASCADE;
TRUNCATE TABLE "Users" CASCADE;
TRUNCATE TABLE "Role" CASCADE;
TRUNCATE TABLE "RespirationExercises" CASCADE;

-- Réinitialiser les séquences
ALTER SEQUENCE "Articles_Id_seq" RESTART WITH 1;
ALTER SEQUENCE "Categories_Id_seq" RESTART WITH 1;
ALTER SEQUENCE "Users_IdUtilisateur_seq" RESTART WITH 1;
ALTER SEQUENCE "Role_Id_seq" RESTART WITH 1;
ALTER SEQUENCE "RespirationExercises_Id_seq" RESTART WITH 1; 