import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Article } from '../../Models/articles.model';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  standalone: true,
  imports: [NgIf, NgFor],
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [];
  loading = false;
  error = '';
  isAdmin = false;

  // Propriétés pour le modal
  selectedArticle: Article | null = null;
  showModal = false;

  constructor(
    private articleService: ArticleService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.loadArticles();
  }

  // Fonction pour remplacer le pipe slice
  getPreview(content: string | undefined): string {
    if (!content) return '';
    return content.length > 150 ? content.substring(0, 150) + '...' : content;
  }

  // Fonction pour remplacer le pipe date
  formatDate(date: string | Date | undefined): string {
    if (!date) return '';
    const d = new Date(date);
    // Format dd/MM/yyyy
    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
  }

  loadArticles(): void {
    this.loading = true;

    // Utiliser uniquement getArticles pour les deux cas
    this.articleService.getArticles()
      .subscribe({
        next: (data) => {
          // Vérifier que data est un tableau
          if (Array.isArray(data)) {
            this.articles = data;
          } else {
            console.error('Les données reçues ne sont pas un tableau:', data);
            this.articles = [];
            this.error = 'Format de données incorrect';
          }
          this.loading = false;
        },
        error: (error: any) => {
          this.error = 'Erreur lors du chargement des articles';
          console.error(error);
          this.loading = false;
          this.articles = []; // S'assurer que articles est un tableau vide en cas d'erreur
        }
      });
  }

  viewArticle(id: number): void {
    // Au lieu de naviguer, on charge l'article et on affiche le modal
    this.loading = true;
    this.articleService.getArticleById(id)
      .subscribe({
        next: (data: Article) => {
          this.selectedArticle = data;
          this.showModal = true;
          this.loading = false;
        },
        error: (error: any) => {
          this.error = 'Erreur lors du chargement de l\'article';
          console.error(error);
          this.loading = false;
        }
      });
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedArticle = null;
  }

  editArticle(id: number): void {
    this.router.navigate(['/admin/articles/edit', id]);
  }

  createArticle(): void {
    this.router.navigate(['/admin/articles/create']);
  }

  deleteArticle(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      this.articleService.deleteArticle(id)
        .subscribe({
          next: () => {
            this.loadArticles();
            // Si l'article supprimé est celui affiché dans le modal, on ferme le modal
            if (this.selectedArticle && this.selectedArticle.id === id) {
              this.closeModal();
            }
          },
          error: (error: any) => {
            this.error = 'Erreur lors de la suppression de l\'article';
            console.error(error);
          }
        });
    }
  }

  deactivateArticle(id: number): void {
    this.articleService.deactivateArticle(id)
      .subscribe({
        next: () => {
          this.loadArticles();
          // Si l'article désactivé est celui affiché dans le modal, on le met à jour
          if (this.selectedArticle && this.selectedArticle.id === id) {
            this.viewArticle(id);
          }
        },
        error: (error: any) => {
          this.error = 'Erreur lors de la désactivation de l\'article';
          console.error(error);
        }
      });
  }
}
