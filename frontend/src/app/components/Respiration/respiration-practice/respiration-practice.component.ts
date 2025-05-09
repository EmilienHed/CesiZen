import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { RespirationExercise, RespirationService } from '../../../services/respiration.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

enum BreathState {
  Inspire = 'Inspirez',
  Hold = 'Retenez',
  Expire = 'Expirez',
  Paused = 'Pausé'
}

@Component({
  selector: 'app-respiration-practice',
  templateUrl: './respiration-practice.component.html',
  styleUrls: ['./respiration-practice.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class RespirationPracticeComponent implements OnInit, OnDestroy {
  exercise: RespirationExercise | null = null;
  loading = true;
  error = '';

  isRunning = false;
  currentState: BreathState = BreathState.Paused;
  secondsRemaining = 0;
  cycleCount = 0;
  totalCycles = 5;

  circleSize = 100;

  private timerSubscription?: Subscription;

  get breathStateEnum() {
    return BreathState;
  }

  constructor(
    private route: ActivatedRoute,
    private respirationService: RespirationService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadExercise(+id);
    } else {
      this.error = 'Aucun exercice spécifié';
      this.loading = false;
    }
  }

  ngOnDestroy(): void {
    this.stopExercise();
  }

  loadExercise(id: number): void {
    this.respirationService.getExercise(id)
      .subscribe({
        next: (data: RespirationExercise) => {
          this.exercise = data;
          this.loading = false;
        },
        error: (error: any) => {
          this.error = 'Erreur lors du chargement de l\'exercice';
          console.error(error);
          this.loading = false;
        }
      });
  }

  startExercise(): void {
    if (!this.exercise) return;

    this.isRunning = true;
    this.cycleCount = 0;
    this.startBreathCycle();
  }

  stopExercise(): void {
    this.isRunning = false;
    this.currentState = BreathState.Paused;
    this.circleSize = 100;

    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  pauseExercise(): void {
    this.isRunning = false;
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  startBreathCycle(): void {
    if (!this.exercise || !this.isRunning) return;

    this.cycleCount++;
    this.startInspire();
  }

  startInspire(): void {
    if (!this.exercise || !this.isRunning) return;

    this.currentState = BreathState.Inspire;
    this.secondsRemaining = this.exercise.inspirationDuration;

    this.animateBreath(
      this.exercise.inspirationDuration,
      100,
      200,
      () => {
        if (this.exercise?.holdDuration && this.exercise.holdDuration > 0) {
          this.startHold();
        } else {
          this.startExpire();
        }
      }
    );
  }

  startHold(): void {
    if (!this.exercise || !this.isRunning) return;

    this.currentState = BreathState.Hold;
    this.secondsRemaining = this.exercise.holdDuration;

    this.timerSubscription = interval(1000)
      .pipe(take(this.exercise.holdDuration))
      .subscribe({
        next: () => {
          this.secondsRemaining--;
        },
        complete: () => {
          this.startExpire();
        }
      });
  }

  startExpire(): void {
    if (!this.exercise || !this.isRunning) return;

    this.currentState = BreathState.Expire;
    this.secondsRemaining = this.exercise.expirationDuration;

    this.animateBreath(
      this.exercise.expirationDuration,
      200,
      100,
      () => {
        if (this.cycleCount < this.totalCycles) {
          this.startBreathCycle();
        } else {
          this.stopExercise();
        }
      }
    );
  }

  animateBreath(duration: number, startSize: number, endSize: number, onComplete: () => void): void {
    const frameCount = duration * 10;
    const sizeStep = (endSize - startSize) / frameCount;
    let frame = 0;

    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    this.circleSize = startSize;

    this.timerSubscription = interval(100)
      .pipe(take(frameCount))
      .subscribe({
        next: () => {
          frame++;
          this.circleSize += sizeStep;

          if (frame % 10 === 0) {
            this.secondsRemaining--;
          }
        },
        complete: () => {
          onComplete();
        }
      });
  }

  setCycles(cycles: number): void {
    this.totalCycles = cycles;
  }
}
