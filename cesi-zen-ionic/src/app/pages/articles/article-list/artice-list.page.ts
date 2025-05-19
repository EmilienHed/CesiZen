// src/app/pages/articles/article-list/article-list.page.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { ArticleService } from '../../../services/article.service';
import { Article } from '../../../models/article.model';
import { LoadingController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.page.html',
  styleUrls: ['./article-list.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink]
})
export class ArticleListPage implements OnInit, OnDestroy {
  articles: Article[] = [];
  loading = false;
  error = '';
  user: any = null;
  private articleCreatedSubscription: Subscription = new Subscription();

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private loadingController: LoadingController,
    private authService: AuthService
  ) { }

  async ngOnInit() {
    await this.loadArticles();
    
    // Utiliser le service d'authentification pour récupérer l'utilisateur connecté
    this.user = this.authService.currentUserValue;
    console.log('Utilisateur actuel:', this.user);
    
    // Tester immédiatement si l'utilisateur est admin
    console.log('Est admin?', this.isAdmin());

    // S'abonner à l'événement de création d'article
    this.articleCreatedSubscription = this.articleService.articleCreated$.subscribe(() => {
      console.log('Article créé, rechargement de la liste');
      this.loadArticles();
    });
  }

  ngOnDestroy() {
    // Se désabonner pour éviter les fuites mémoire
    if (this.articleCreatedSubscription) {
      this.articleCreatedSubscription.unsubscribe();
    }
  }

  // Méthode pour vérifier si l'utilisateur est un administrateur
  isAdmin(): boolean {
    if (!this.user) {
      console.log('isAdmin: Pas d\'utilisateur connecté');
      return false;
    }
    
    console.log('isAdmin check - role:', this.user.role, 'roleId:', this.user.roleId);
    
    // Vérifier soit roleId=0 soit role="Admin"
    const isAdminRole = this.user.role === 'Admin';
    const isAdminRoleId = this.user.roleId === 0 || Number(this.user.roleId) === 0;
    
    console.log('isAdminRole:', isAdminRole, 'isAdminRoleId:', isAdminRoleId);
    
    return isAdminRole || isAdminRoleId;
  }

  // Méthode pour afficher le bouton uniquement pour les administrateurs
  showAddButton(): boolean {
    return this.isAdmin();
  }

  async loadArticles() {
    const loading = await this.loadingController.create({
      message: 'Chargement des articles...',
      spinner: 'circles'
    });
    await loading.present();

    this.articleService.getArticles().subscribe({
      next: (data) => {
        this.articles = data;
        loading.dismiss();
      },
      error: (error) => {
        this.error = 'Impossible de charger les articles. Veuillez réessayer.';
        console.error(error);
        loading.dismiss();
      }
    });
  }

  viewArticle(id: number) {
    this.router.navigate(['/tabs/articles', id]);
  }

  getPreview(content: string): string {
    if (!content) return '';

    // Supprimer les balises HTML
    const plainText = content.replace(/<[^>]*>/g, '');

    // Limiter à 150 caractères
    return plainText.length > 150 ? plainText.substring(0, 150) + '...' : plainText;
  }

  formatDate(dateString: string | Date): string {
    if (!dateString) return '';

    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  doRefresh(event: any) {
    this.loadArticles().then(() => {
      event.target.complete();
    });
  }
}
