export interface User {
  idUtilisateur: number;
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  dateNaissance?: Date;
  role: string;
  dateCreation: Date;
  dateDerniereConnexion?: Date;
}
