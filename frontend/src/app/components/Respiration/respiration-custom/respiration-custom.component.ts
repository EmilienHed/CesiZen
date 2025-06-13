import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-respiration-custom',
  templateUrl: './respiration-custom.component.html',
  styleUrls: ['./respiration-custom.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class RespirationCustomComponent {
  customForm: FormGroup;

  constructor(
      private fb: FormBuilder,
      private router: Router
  ) {
    this.customForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      inspirationDuration: [4, [Validators.required, Validators.min(1), Validators.max(20)]],
      holdDuration: [0, [Validators.required, Validators.min(0), Validators.max(20)]],
      expirationDuration: [6, [Validators.required, Validators.min(1), Validators.max(20)]]
    });
  }

  onSubmit() {
    if (this.customForm.valid) {
      const formValue = this.customForm.value;

      // Si l'utilisateur n'a pas spécifié de nom, utiliser un nom par défaut
      if (!formValue.name.trim()) {
        formValue.name = 'Mon exercice personnalisé';
      }

      const exercise = {
        id: 'temp',
        ...formValue,
        description: 'Exercice personnalisé créé le ' + new Date().toLocaleDateString('fr-FR')
      };

      // Stocker l'exercice temporairement dans le localStorage
      localStorage.setItem('tempExercise', JSON.stringify(exercise));

      // Rediriger vers la page de pratique
      this.router.navigate(['/respiration/practice/temp']);
    }
  }
}
