import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { first } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {
    // Rediriger si déjà connecté
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {}

  get f() { return this.loginForm.controls; }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    this.submitted = true;

    // Arrêter si le formulaire est invalide
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.login({
      email: this.f['email'].value,
      password: this.f['password'].value
    })
      .pipe(first())
      .subscribe({
        next: () => {
          // Naviguer vers la page d'accueil après connexion réussie
          this.router.navigate(['/']);
        },
        error: error => {
          this.error = error.error?.message || 'Une erreur est survenue lors de la connexion';
          this.loading = false;
        }
      });
  }
}
