// src/app/pages/exercices/exercice-list/exercice-list.page.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RespirationService } from '../../../services/respiration.service';
import { RespirationExercise } from '../../../models/respiration-exercise.model';
import { LoadingController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exercice-list',
  templateUrl: './exercice-list.page.html',
  styleUrls: ['./exercice-list.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class ExerciceListPage implements OnInit {
  exercises: RespirationExercise[] = [];
  loading = false;
  error = '';

  constructor(
    private respirationService: RespirationService,
    private router: Router,
    private loadingController: LoadingController
  ) { }

  async ngOnInit() {
    console.log('Initialisation de la page des exercices');
    await this.loadExercises();
  }

  async loadExercises() {
    console.log('Chargement des exercices...');
    const loading = await this.loadingController.create({
      message: 'Chargement des exercices...',
      spinner: 'circles'
    });
    await loading.present();

    this.respirationService.getExercises().subscribe({
      next: (data) => {
        console.log('Exercices reçus:', data);
        // Ajouter isDefault à chaque élément si nécessaire
        this.exercises = data.map(exercise => ({
          ...exercise,
          isDefault: exercise.isDefault !== undefined ? exercise.isDefault : false
        }));
        this.error = '';
        loading.dismiss();
      },
      error: (error) => {
        console.error('Erreur lors du chargement des exercices:', error);
        this.error = `Impossible de charger les exercices: ${error.message || 'Erreur inconnue'}`;
        loading.dismiss();
      }
    });
  }

  startExercise(id: number) {
    console.log('Démarrage de l\'exercice:', id);
    this.router.navigate(['/tabs/exercises', id]);
  }

  doRefresh(event: any) {
    console.log('Rafraîchissement de la liste des exercices');
    this.loadExercises().then(() => {
      event.target.complete();
    });
  }
}
