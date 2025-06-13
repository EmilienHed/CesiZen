import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../Models/user.model';
import { AuthService } from '../../../services/auth.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  providers: [DatePipe]
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error = '';
  successMessage = '';
  searchTerm = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    // Vérifier que l'utilisateur est administrateur
    if (!this.authService.isAdmin()) {
      this.router.navigate(['/']);
      return;
    }

    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getAllUsers()
      .subscribe({
        next: (data) => {
          console.log('Données reçues de l\'API:', data);
          this.users = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Erreur lors du chargement des utilisateurs:', error);
          this.error = 'Erreur lors du chargement des utilisateurs: ' + error.message;
          this.loading = false;
        }
      });
  }

  // Méthode pour formater une date
  formatDate(date: string | null | undefined): string {
    if (!date) return 'Non définie';
    return this.datePipe.transform(date, 'dd/MM/yyyy') || 'Non définie';
  }

  editUser(id: number): void {
    this.router.navigate(['/admin/users/edit', id]);
  }

  deleteUser(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.')) {
      this.loading = true;
      this.userService.deleteUser(id)
        .subscribe({
          next: () => {
            this.successMessage = 'Utilisateur supprimé avec succès';
            this.loadUsers();
          },
          error: (error) => {
            this.error = 'Erreur lors de la suppression: ' + error.message;
            this.loading = false;
          }
        });
    }
  }

  resetPassword(id: number): void {
    const newPassword = prompt('Entrez le nouveau mot de passe pour cet utilisateur:');
    if (newPassword) {
      this.loading = true;
      this.userService.changeUserPassword(id, newPassword)
        .subscribe({
          next: () => {
            this.successMessage = 'Mot de passe modifié avec succès';
            this.loading = false;
          },
          error: (error) => {
            this.error = 'Erreur lors du changement de mot de passe: ' + error.message;
            this.loading = false;
          }
        });
    }
  }

  backToDashboard(): void {
    this.router.navigate(['/admin']);
  }

  // Méthode pour filtrer les utilisateurs
  get filteredUsers(): User[] {
    if (!this.searchTerm) {
      return this.users;
    }

    const term = this.searchTerm.toLowerCase();
    return this.users.filter(user =>
      (user.nom?.toLowerCase().includes(term) || '') ||
      (user.prenom?.toLowerCase().includes(term) || '') ||
      (user.email?.toLowerCase().includes(term) || '')
    );
  }

  // Méthode pour créer un nouvel utilisateur
  createUser(): void {
    this.router.navigate(['/admin/users/edit', 'new']);
  }

  // Méthode pour déterminer le rôle d'un utilisateur
  getUserRole(roleId: number | null | undefined): string {
    if (roleId === 0) {
      return 'Admin';
    } else if (roleId === 1) {
      return 'Utilisateur';
    } else {
      return 'Non défini';
    }
  }

  // Méthode pour obtenir la classe CSS du badge en fonction du rôle
  getRoleBadgeClass(roleId: number | null | undefined): string {
    if (roleId === 0) {
      return 'bg-warning';
    } else if (roleId === 1) {
      return 'bg-primary';
    } else {
      return 'bg-secondary';
    }
  }
}
