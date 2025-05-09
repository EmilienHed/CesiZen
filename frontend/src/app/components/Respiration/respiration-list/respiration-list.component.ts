/*
import { Component, OnInit } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { RespirationExercise, RespirationService } from '../../../services/respiration.service';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-respiration-list',
  templateUrl: './respiration-list.component.html',
  styleUrls: ['./respiration-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ]
})
export class RespirationListComponent implements OnInit {
  exercises: RespirationExercise[] = [];
  loading = false;
  error = '';

  constructor(
    private respirationService: RespirationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadExercises();
  }

  loadExercises(): void {
    this.loading = true;
    this.respirationService.getExercises()
      .subscribe({
        next: (data: RespirationExercise[]) => {
          this.exercises = data;
          this.loading = false;
        },
        error: (error: any) => {
          this.error = 'Erreur lors du chargement des exercices';
          console.error(error);
          this.loading = false;
        }
      });
  }

  startExercise(id: number): void {
    this.router.navigate(['/respiration/practice', id]);
  }
}
*/






import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RespirationExercise, RespirationService } from '../../../services/respiration.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-respiration-list',
  templateUrl: './respiration-list.component.html',
  styleUrls: ['./respiration-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class RespirationListComponent implements OnInit {
  exercises: RespirationExercise[] = [];
  loading = false;
  error = '';

  constructor(
    private respirationService: RespirationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadExercises();
  }

  loadExercises(): void {
    this.loading = true;
    this.respirationService.getExercises()
      .subscribe({
        next: (data: RespirationExercise[]) => {
          this.exercises = data;
          this.loading = false;
        },
        error: (error: any) => {
          this.error = 'Erreur lors du chargement des exercices';
          console.error(error);
          this.loading = false;
        }
      });
  }

  startExercise(id: number): void {
    this.router.navigate(['/respiration/practice', id]);
  }
}
