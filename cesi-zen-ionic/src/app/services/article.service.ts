
// src/app/services/article.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Article } from '../models/article.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = `${environment.apiUrl}/api/Articles`;

  constructor(private http: HttpClient) { }

  getArticles(): Observable<Article[]> {
    return this.http.get<any>(`${this.apiUrl}/active`)
      .pipe(
        map((response: any) => {
          if (response && response.$values) {
            return response.$values;
          }
          return response;
        })
      );
  }

  getArticleById(id: number): Observable<Article> {
    return this.http.get<any>(`${this.apiUrl}/${id}`)
      .pipe(
        map((response: any) => {
          if (response && response.$values && response.$values.length > 0) {
            return response.$values[0];
          }
          return response;
        })
      );
  }
}
