// src/app/pages/articles/article-detail/article-detail.page.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../../services/article.service';
import { Article } from '../../../models/article.model';
import { LoadingController } from '@ionic/angular';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.page.html',
  styleUrls: ['./article-detail.page.scss'],
})
export class ArticleDetailPage implements OnInit {
  article: Article | null = null;
  safeContent: SafeHtml = '';
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private loadingController: LoadingController,
    private sanitizer: DomSanitizer
  ) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      await this.loadArticle(+id);
    } else {
      this.error = 'Aucun article spécifié.';
    }
  }

  async loadArticle(id: number) {
    const loading = await this.loadingController.create({
      message: 'Chargement de l\'article...',
      spinner: 'circles'
    });
    await loading.present();

    this.articleService.getArticleById(id).subscribe({
      next: (data) => {
        this.article = data;
        if (this.article && this.article.content) {
          this.safeContent = this.sanitizer.bypassSecurityTrustHtml(this.article.content);
        }
        loading.dismiss();
      },
      error: (error) => {
        this.error = 'Impossible de charger l\'article. Veuillez réessayer.';
        console.error(error);
        loading.dismiss();
      }
    });
  }

  formatDate(dateString: string | Date): string {
    if (!dateString) return '';

    const date = new Date(dateString);
    return date.toLocaleDateString();
  }
}
