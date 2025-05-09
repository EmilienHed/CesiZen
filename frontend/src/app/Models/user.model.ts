export interface User {
  idUtilisateur: number;
  nom: string;
  prenom: string;
  email: string;
  motDePasse?: string; // Optionnel car ne devrait pas être retourné par l'API
  dateNaissance?: string; // Changé de Date à string pour correspondre à la réponse API
  role?: string;  // Maintenu pour la compatibilité mais obsolète
  roleId: number; // 1 = User, 2 = Admin
  dateCreation: string; // Changé de Date à string pour correspondre à la réponse API
  dateDerniereConnexion?: string; // Changé de Date à string
  $id?: string; // Champ potentiellement présent dans la réponse API
}
