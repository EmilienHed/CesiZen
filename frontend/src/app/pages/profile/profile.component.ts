import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService, UserUpdateDto } from '../../services/user.service';
import { User } from '../../Models/user.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  passwordForm: FormGroup;
  user: User | null = null;
  loading = false;
  passwordLoading = false;
  error = '';
  passwordError = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    this.profileForm = this.formBuilder.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.passwordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    const currentUser = this.authService.currentUserValue;
    if (!currentUser) {
      this.error = 'Utilisateur non connecté';
      return;
    }

    this.loading = true;
    this.userService.getUserById(currentUser.userId).subscribe({
      next: (userData) => {
        this.user = userData;
        this.profileForm.patchValue({
          prenom: userData.prenom,
          nom: userData.nom,
          email: userData.email
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement du profil:', error);
        this.error = 'Impossible de charger le profil. Veuillez réessayer.';
        this.loading = false;
      }
    });
  }

  onSubmit() {
    if (this.profileForm.invalid) {
      return;
    }

    const currentUser = this.authService.currentUserValue;
    if (!currentUser || !this.user) {
      this.error = 'Utilisateur non connecté';
      return;
    }

    this.loading = true;
    const userData: UserUpdateDto = {
      prenom: this.profileForm.value.prenom,
      nom: this.profileForm.value.nom,
      email: this.profileForm.value.email
    };

    this.userService.updateUser(currentUser.userId, userData).subscribe({
      next: () => {
        alert('Profil mis à jour avec succès');
        this.loadUserProfile();
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour:', error);
        this.error = 'Une erreur s\'est produite lors de la mise à jour du profil. Veuillez réessayer.';
        this.loading = false;
      }
    });
  }

  onPasswordSubmit() {
    if (this.passwordForm.invalid) {
      return;
    }

    const currentUser = this.authService.currentUserValue;
    if (!currentUser) {
      this.passwordError = 'Utilisateur non connecté';
      return;
    }

    this.passwordLoading = true;
    const passwordData = {
      newPassword: this.passwordForm.value.newPassword
    };

    this.userService.updatePassword(currentUser.userId, passwordData).subscribe({
      next: () => {
        alert('Mot de passe modifié avec succès');
        this.passwordForm.reset();
        this.passwordError = '';
      },
      error: (error) => {
        console.error('Erreur lors de la modification du mot de passe:', error);
        this.passwordError = 'Une erreur s\'est produite lors de la modification du mot de passe. Veuillez réessayer.';
        this.passwordLoading = false;
      }
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (newPassword !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    return null;
  }

  logout() {
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }
} 