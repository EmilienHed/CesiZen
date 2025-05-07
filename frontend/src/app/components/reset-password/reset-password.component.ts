import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ]
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  success = false;
  token: string = '';
  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
// Rediriger si déjà connecté
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }

    this.resetPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.checkPasswords // Validation personnalisée pour comparer les mots de passe
    });
  }

  ngOnInit(): void {
// Récupérer le token de réinitialisation depuis l'URL
    this.route.queryParams.subscribe(params => {
      if (params['token']) {
        this.token = params['token'];
      } else {
        // Rediriger vers la page de demande de réinitialisation si aucun token n'est présent
        this.router.navigate(['/forgot-password']);
      }
    });
  }

// Validation personnalisée pour vérifier que les mots de passe correspondent
  checkPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { notSame: true };
  }

// Getter pour un accès facile aux champs du formulaire
  get f() { return this.resetPasswordForm.controls; }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    this.submitted = true;

// Arrêter si le formulaire est invalide
    if (this.resetPasswordForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.resetPassword(this.token, this.f['password'].value)
      .subscribe({
        next: () => {
          this.success = true;
          this.loading = false;
// Rediriger vers la page de connexion après quelques secondes
          setTimeout(() => {
            this.router.navigate(['/login'], { queryParams: { resetSuccess: true } });
          }, 3000);
        },
        error: error => {
          this.error = error.error?.message || 'Une erreur est survenue lors de la réinitialisation du mot de passe';
          this.loading = false;
        }
      });
  }
}
