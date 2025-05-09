import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { AuthService } from '../../services/auth.service';
import { Article } from '../../Models/articles.model';
import { DatePipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  imports: [
    DatePipe,
    NgIf
  ],
  standalone: true,
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  article: Article | null = null;
  loading = false;
  error = '';
  isAdmin = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.loadArticle();
  }

  loadArticle(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loading = true;
      this.articleService.getArticleById(+id)
        .subscribe({
          next: (data: Article) => {
            if (data.isActive || this.isAdmin) {
              this.article = data;
            } else {
              this.router.navigate(['/articles']);
            }
            this.loading = false;
          },
          error: (error: any) => {
            this.error = 'Erreur lors du chargement de l\'article';
            console.error(error);
            this.loading = false;
          }
        });
    }
  }

  editArticle(): void {
    if (this.article) {
      this.router.navigate(['/admin/articles/edit', this.article.id]);
    }
  }

  deleteArticle(): void {
    if (this.article && confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      this.articleService.deleteArticle(this.article.id!)
        .subscribe({
          next: () => {
            this.router.navigate(['/articles']);
          },
          error: (error: any) => {
            this.error = 'Erreur lors de la suppression de l\'article';
            console.error(error);
          }
        });
    }
  }

  deactivateArticle(): void {
    if (this.article) {
      this.articleService.deactivateArticle(this.article.id!)
        .subscribe({
          next: () => {
            this.loadArticle();
          },
          error: (error: any) => {
            this.error = 'Erreur lors de la désactivation de l\'article';
            console.error(error);
          }
        });
    }
  }

  goBack(): void {
    this.router.navigate(['/articles']);
  }
}
