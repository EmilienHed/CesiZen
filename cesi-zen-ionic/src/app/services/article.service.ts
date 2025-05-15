// src/app/services/article.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Article } from "../models/article.model";

interface ApiResponse<T> {
  $id: string;
  $values: T[];
}

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = `${environment.apiUrl}/api/Articles`;

  constructor(private http: HttpClient) { }

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
        catchError(error => {
          console.error('Erreur lors de la récupération de l\'article:', error);
          throw error;
        })
      );
  }
}
