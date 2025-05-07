// src/app/services/article.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Article } from '../Models/articles.model';
import { ArticleDTO, UpdateArticleDTO } from '../Models/articles-dto.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private baseUrl = 'http://localhost:5016'; // Assurez-vous que c'est la bonne URL de votre backend
  private apiUrl = `${this.baseUrl}/api/articles`; // Ajout du préfixe 'api/'

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  // Méthode pour obtenir les en-têtes d'authentification
  private getAuthHeaders(): HttpHeaders {
    const user = this.authService.currentUserValue;
    const token = user ? user.token : null;
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Méthode pour extraire le tableau d'articles de la réponse de l'API
  private extractArticlesArray(response: any): Article[] {
    // Vérifie si la réponse a la structure attendue
    if (response && response.$values && Array.isArray(response.$values)) {
      // Retourne le tableau $values
      return response.$values;
    } else if (Array.isArray(response)) {
      // Si c'est déjà un tableau, le retourner directement
      return response;
    } else {
      console.error('Format de réponse inattendu:', response);
      return []; // Retourner un tableau vide en cas d'erreur
    }
  }

  getArticles(): Observable<Article[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => this.extractArticlesArray(response))
    );
  }

  getAllArticles(): Observable<Article[]> {
    const options = {
      headers: this.getAuthHeaders()
    };
    return this.http.get<any>(`${this.apiUrl}/all`, options).pipe(
      map(response => this.extractArticlesArray(response))
    );
  }

  getArticleById(id: number): Observable<Article> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(response => {
        // Si la réponse a une structure particulière, extraire l'article
        if (response && response.$values && response.$values.length > 0) {
          return response.$values[0];
        } else {
          return response;
        }
      })
    );
  }

  createArticle(article: ArticleDTO): Observable<Article> {
    const options = {
      headers: this.getAuthHeaders()
    };
    console.log('Données envoyées au serveur:', JSON.stringify(article, null, 2));
    return this.http.post<Article>(this.apiUrl, article, options);
  }

  updateArticle(article: UpdateArticleDTO): Observable<Article> {
    const options = {
      headers: this.getAuthHeaders()
    };
    console.log('Données de mise à jour envoyées au serveur:', JSON.stringify(article, null, 2));
    return this.http.put<Article>(`${this.apiUrl}/${article.id}`, article, options);
  }

  deleteArticle(id: number): Observable<any> {
    const options = {
      headers: this.getAuthHeaders()
    };
    return this.http.delete(`${this.apiUrl}/${id}`, options);
  }

  deactivateArticle(id: number): Observable<any> {
    const options = {
      headers: this.getAuthHeaders()
    };
    return this.http.put(`${this.apiUrl}/deactivate/${id}`, {}, options);
  }

  getArticlesByCategory(categoryId: number): Observable<Article[]> {
    return this.http.get<any>(`${this.apiUrl}/category/${categoryId}`).pipe(
      map(response => this.extractArticlesArray(response))
    );
  }

  getArticlesByUser(userId: number): Observable<Article[]> {
    return this.http.get<any>(`${this.apiUrl}/user/${userId}`).pipe(
      map(response => this.extractArticlesArray(response))
    );
  }
}
