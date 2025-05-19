// src/app/services/article.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, forkJoin, of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Article } from "../models/article.model";
import { UserService } from './user.service';

interface ApiResponse<T> {
  $id: string;
  $values: T[];
}

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = `${environment.apiUrl}/api/Articles`;
  
  // Subject pour notifier quand un article est créé
  private articleCreatedSubject = new Subject<void>();
  articleCreated$ = this.articleCreatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  // Méthode pour signaler qu'un article a été créé
  notifyArticleCreated() {
    this.articleCreatedSubject.next();
  }

  getArticles(): Observable<Article[]> {
    return this.http.get<ApiResponse<Article>>(`${this.apiUrl}/active`)
      .pipe(
        map((response: ApiResponse<Article>) => {
          console.log('Réponse API getArticles:', response);
          if (response && response.$values) {
            return response.$values;
          }
          return [];
        }),
        catchError(error => {
          console.error('Erreur lors de la récupération des articles:', error);
          throw error;
        })
      );
  }

  getArticleById(id: number): Observable<Article> {
    console.log('Récupération de l\'article avec l\'ID:', id);
    return this.http.get<Article>(`${this.apiUrl}/${id}`)
      .pipe(
        map((response: Article) => {
          console.log('Réponse API getArticleById:', response);
          if (!response) {
            throw new Error('Réponse invalide de l\'API');
          }
          return response;
        }),
        switchMap(article => {
          // Si l'article a un userId, récupérer les informations de l'utilisateur
          if (article.userId) {
            return this.getUserDetailsForArticle(article);
          }
          return of(article);
        }),
        catchError(error => {
          console.error('Erreur lors de la récupération de l\'article:', error);
          throw error;
        })
      );
  }

  // Récupérer les détails de l'utilisateur pour un article
  private getUserDetailsForArticle(article: Article): Observable<Article> {
    // Si l'article a déjà un userName complet, on retourne l'article tel quel
    if (article.userName && article.userName.trim() !== '') {
      return of(article);
    }

    // Vérifier que userId est bien défini
    if (!article.userId) {
      console.warn('Article sans userId défini, impossible de récupérer les détails utilisateur');
      return of(article);
    }

    // Sinon, on récupère les informations de l'utilisateur
    return this.userService.getUserById(Number(article.userId)).pipe(
      map(user => {
        // Mise à jour du userName en fonction de la structure de l'utilisateur retourné
        if (user.firstName && user.lastName) {
          article.userName = `${user.firstName} ${user.lastName}`;
        } else if (user.prenom && user.nom) {
          article.userName = `${user.prenom} ${user.nom}`;
        } else {
          article.userName = user.email || 'Utilisateur inconnu';
        }
        return article;
      }),
      catchError(error => {
        console.error('Erreur lors de la récupération des détails utilisateur:', error);
        // En cas d'erreur, on garde l'article tel quel
        return of(article);
      })
    );
  }
}
