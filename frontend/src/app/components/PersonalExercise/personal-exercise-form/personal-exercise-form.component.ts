// src/app/components/PersonalExercise/personal-exercise-form/personal-exercise-form.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-personal-exercise-form',
  templateUrl: './personal-exercise-form.component.html',
  styleUrls: ['./personal-exercise-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class PersonalExerciseFormComponent {
  // Valeurs par défaut pour les sliders
  inspirationDuration: number = 4;
  holdDuration: number = 0;
  expirationDuration: number = 4;

  constructor(private router: Router) { }

  // Calculer la durée totale du cycle
  get totalDuration(): number {
    return this.inspirationDuration + this.holdDuration + this.expirationDuration;
  }

  // Créer un objet d'exercice temporaire et démarrer l'exercice
  startExercise(): void {
    // Créer un exercice temporaire en mémoire
    const exercise = {
      id: 999, // ID temporaire pour l'exercice personnalisé
      name: "Exercice personnalisé",
      description: "Exercice configuré manuellement",
      inspirationDuration: this.inspirationDuration,
      holdDuration: this.holdDuration,
      expirationDuration: this.expirationDuration,
      isDefault: false
    };

    // Stocker l'exercice dans le sessionStorage
    sessionStorage.setItem('tempExercise', JSON.stringify(exercise));

    // Rediriger vers le composant de pratique avec un ID spécial pour l'exercice temporaire
    this.router.navigate(['/respiration/practice/temp']);
  }

  // Revenir à la liste des exercices
  goBack(): void {
    this.router.navigate(['/respiration']);
  }
}
