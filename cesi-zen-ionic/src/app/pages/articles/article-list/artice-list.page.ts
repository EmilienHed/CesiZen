// src/app/pages/articles/article-list/article-list.page.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../../../services/article.service';
import { Article } from '../../../models/article.model';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.page.html',
  styleUrls: ['./article-list.page.scss'],
})
export class ArticleListPage implements OnInit {
  articles: Article[] = [];
  loading = false;
  error = '';

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private loadingController: LoadingController
  ) { }

  async ngOnInit() {
    await this.loadArticles();
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
