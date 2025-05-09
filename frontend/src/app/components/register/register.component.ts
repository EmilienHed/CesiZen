import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { first } from 'rxjs/operators';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {UserCreateDto, UserService} from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
  ) {
    // Rediriger si déjà connecté
    if (this.userService.currentUserValue) {
      this.router.navigate(['/']);
    }

    this.registerForm = this.formBuilder.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateNaissance: ['', Validators.required],
      motDePasse: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.checkPasswords // Validation personnalisée pour comparer les mots de passe
    });
  }

  ngOnInit(): void {}

  // Validation personnalisée pour vérifier que les mots de passe correspondent
  checkPasswords(group: FormGroup) {
    const password = group.get('motDePasse')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { notSame: true };
  }

  // Getter pour un accès facile aux champs du formulaire
  get f() { return this.registerForm.controls; }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

/*  onSubmit() {
    this.submitted = true;

    // Arrêter si le formulaire est invalide
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;

    // Créer un objet utilisateur à partir des valeurs du formulaire
    const userData: UserCreateDto = {
      prenom: this.f['prenom'].value,
      nom: this.f['nom'].value,
      email: this.f['email'].value,
      motDePasse: this.f['motDePasse'].value,
      dateNaissance: this.f['dateNaissance'].value
    };

    this.userService.register(userData)
      .pipe(first())
      .subscribe({
        next: () => {
          // Rediriger vers la page de connexion après l'inscription réussie
          this.router.navigate(['/login'], { queryParams: { registered: true } });
        },
        error: error => {
          this.error = error.error?.message || 'Une erreur est survenue lors de l\'inscription';
          this.loading = false;
        }
      });
  }
}*/


// Dans la méthode onSubmit() de register.component.ts
  onSubmit() {
    this.submitted = true;

    // Arrêter si le formulaire est invalide
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;

// Créer un objet utilisateur à partir des valeurs du formulaire
    const userData: UserCreateDto = {
      prenom: this.f['prenom'].value,
      nom: this.f['nom'].value,
      email: this.f['email'].value,
      motDePasse: this.f['motDePasse'].value,
      dateNaissance: this.f['dateNaissance'].value,
      roleId: 1 // Définir explicitement le roleId à 1
    };

    this.userService.register(userData)
      .pipe(first())
      .subscribe({
        next: () => {
          // Rediriger vers la page de connexion après l'inscription réussie
          this.router.navigate(['/login'], { queryParams: { registered: true } });
        },
        error: error => {
          this.error = error.error?.message || 'Une erreur est survenue lors de l\'inscription';
          this.loading = false;
        }
      });
  }
}
