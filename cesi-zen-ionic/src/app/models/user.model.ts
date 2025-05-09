// src/app/models/user.model.ts
export interface User {
  idUtilisateur: number;
  nom: string;
  prenom: string;
  email: string;
  motDePasse?: string;
  dateNaissance?: string;
  roleId: number;
  dateCreation: string;
  dateDerniereConnexion?: string;
}

// src/app/models/auth.model.ts
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userId: number;
  userName: string;
  role: string;
  expiration: Date;
}

// src/app/models/respiration-exercise.model.ts
export interface RespirationExercise {
  id: number;
  name: string;
  inspirationDuration: number;
  holdDuration: number;
  expirationDuration: number;
  description: string;
  isDefault: boolean;
}

// src/app/models/article.model.ts
export interface Article {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: Date | string;
  userName: string;
  categoryName?: string;
  categoryId?: number;
  isActive: boolean;
}
