// src/app/pages/articles/article-detail/article-detail.page.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../../../services/article.service';
import { AuthService } from '../../../services/auth.service';
import { Article } from '../../../models/article.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.page.html',
  styleUrls: ['./article-detail.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArticleDetailPage implements OnInit {
  article: Article | null = null;
  safeContent: SafeHtml = '';
  loading = false;
  error = '';
  isAdmin = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private authService: AuthService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadArticle(+id);
    } else {
      this.error = 'Aucun article spécifié.';
    }
  }

  loadArticle(id: number) {
    this.loading = true;
    this.error = '';
    
    this.articleService.getArticleById(id).subscribe({
      next: (data: Article) => {
        console.log('Article reçu:', data);
        this.article = data;
        if (this.article?.content) {
          this.safeContent = this.sanitizer.bypassSecurityTrustHtml(this.article.content);
        }
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Erreur lors du chargement de l\'article:', error);
        this.error = error.message || 'Erreur lors du chargement de l\'article. Veuillez réessayer.';
        this.loading = false;
      }
    });
  }

  retryLoading() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadArticle(+id);
    }
  }

  formatDate(dateString: string | Date | undefined): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  goBack(): void {
    this.router.navigate(['/tabs/articles']);
  }
}
