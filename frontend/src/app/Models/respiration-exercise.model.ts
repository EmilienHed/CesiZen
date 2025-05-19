export interface RespirationExercise {
  id: number;
  name: string;
  description: string;
  inspirationDuration: number;
  holdDuration: number;
  expirationDuration: number;
  isDefault?: boolean;
}

// Données mockées pour les exercices
export const MOCK_EXERCISES: RespirationExercise[] = [
  {
    id: 1,
    name: 'Cohérence Cardiaque 4-7-8',
    description: 'Technique de respiration pour réduire le stress et favoriser le sommeil',
    inspirationDuration: 4,
    holdDuration: 7,
    expirationDuration: 8,
    isDefault: true
  },
  {
    id: 2,
    name: 'Respiration Carrée',
    description: 'Exercice de respiration pour améliorer la concentration',
    inspirationDuration: 4,
    holdDuration: 4,
    expirationDuration: 4,
    isDefault: true
  },
  {
    id: 3,
    name: 'Respiration Relaxante',
    description: 'Technique de respiration pour se détendre rapidement',
    inspirationDuration: 5,
    holdDuration: 0,
    expirationDuration: 5,
    isDefault: true
  }
];
