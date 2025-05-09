import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { ArticleService } from '../../../services/article.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  providers: [DatePipe]
})
export class AdminDashboardComponent implements OnInit {
  currentUser: any;
  users: any[] = [];
  articles: any[] = [];
  lastLogin: string = '';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private articleService: ArticleService,
    private router: Router,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    // Vérifier que l'utilisateur est administrateur
    if (!this.authService.isAdmin()) {
      this.router.navigate(['/']);
      return;
    }

    this.currentUser = this.authService.currentUserValue;

    // Charger les statistiques
    this.loadStats();
  }

  loadStats(): void {
    // Charger les utilisateurs
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        // Formater la date de dernière connexion
        if (this.currentUser && this.currentUser.dateDerniereConnexion) {
          this.lastLogin = this.datePipe.transform(this.currentUser.dateDerniereConnexion, 'dd/MM/yyyy HH:mm') || 'Non disponible';
        } else {
          this.lastLogin = 'Non disponible';
        }
      },
      error: (error) => console.error('Erreur lors du chargement des utilisateurs:', error)
    });

    // Charger les articles
    this.articleService.getArticles().subscribe({
      next: (data) => {
        this.articles = data;
      },
      error: (error) => console.error('Erreur lors du chargement des articles:', error)
    });
  }

  navigateToUserManagement(): void {
    this.router.navigate(['/admin/users']);
  }

  navigateToArticleManagement(): void {
    this.router.navigate(['/articles']);
  }
}
