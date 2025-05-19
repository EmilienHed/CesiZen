// src/app/models/user.model.ts
export interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  prenom?: string;
  nom?: string;
  dateOfBirth?: Date;
  createdAt: Date;
  updatedAt: Date;
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
  userId?: number;
  categoryName?: string;
  categoryId?: number;
  isActive: boolean;
}
