import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, UserCreateDto, UserUpdateDto } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  userId: string = '';
  isNewUser = false;
  loading = false;
  error = '';
  successMessage = '';
  roles = [
    { id: 1, name: 'User' },
    { id: 2, name: 'Admin' }
  ];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Initialiser le formulaire
    this.userForm = this.fb.group({
      nom: ['', [Validators.required, Validators.maxLength(50)]],
      prenom: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      dateNaissance: [''],
      roleId: [1, Validators.required],
      motDePasse: ['', [Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // Vérifier que l'utilisateur est administrateur
    if (!this.authService.isAdmin()) {
      this.router.navigate(['/']);
      return;
    }

    // Récupérer l'id de l'utilisateur depuis l'URL
    const idParam = this.route.snapshot.paramMap.get('id');
    this.userId = idParam !== null ? idParam : '';
    this.isNewUser = this.userId === 'new';

    // Si c'est un nouvel utilisateur, le mot de passe est obligatoire
    if (this.isNewUser) {
      const passwordControl = this.userForm.get('motDePasse');
      if (passwordControl) {
        passwordControl.setValidators([Validators.required, Validators.minLength(6)]);
        passwordControl.updateValueAndValidity();
      }
    } else {
      this.loadUserData(parseInt(this.userId));
    }
  }

  loadUserData(id: number): void {
    this.loading = true;
    this.userService.getUserById(id)
      .subscribe({
        next: (user) => {
          // Pré-remplir le formulaire avec les données de l'utilisateur
          this.userForm.patchValue({
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            dateNaissance: user.dateNaissance ? new Date(user.dateNaissance).toISOString().substring(0, 10) : '',
            roleId: user.roleId
          });
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Erreur lors du chargement des données: ' + error.message;
          this.loading = false;
        }
      });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }

    this.loading = true;
    
    if (this.isNewUser) {
      // Créer un nouvel utilisateur
      const userData: UserCreateDto = this.userForm.value;
      this.userService.register(userData)
        .subscribe({
          next: () => {
            this.successMessage = 'Utilisateur créé avec succès';
            this.loading = false;
            setTimeout(() => this.router.navigate(['/admin/users']), 1500);
          },
          error: (error) => {
            this.error = 'Erreur lors de la création: ' + error.message;
            this.loading = false;
          }
        });
    } else {
      // Mettre à jour un utilisateur existant
      const userData: UserUpdateDto = {
        nom: this.userForm.value.nom,
        prenom: this.userForm.value.prenom,
        email: this.userForm.value.email,
        dateNaissance: this.userForm.value.dateNaissance,
        roleId: this.userForm.value.roleId
      };

      // Si un mot de passe est fourni, mettre à jour également le mot de passe
      if (this.userForm.value.motDePasse) {
        this.userService.changeUserPassword(parseInt(this.userId), this.userForm.value.motDePasse)
          .subscribe({
            error: (error) => {
              this.error = 'Erreur lors de la mise à jour du mot de passe: ' + error.message;
            }
          });
      }

      this.userService.updateUser(parseInt(this.userId), userData)
        .subscribe({
          next: () => {
            this.successMessage = 'Utilisateur mis à jour avec succès';
            this.loading = false;
            setTimeout(() => this.router.navigate(['/admin/users']), 1500);
          },
          error: (error) => {
            this.error = 'Erreur lors de la mise à jour: ' + error.message;
            this.loading = false;
          }
        });
    }
  }

  backToUserList(): void {
    this.router.navigate(['/admin/users']);
  }
}
