// src/app/services/categorie.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Category } from '../Models/categorie.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  // URL de l'API directement définie ici - URL en minuscules
  private apiUrl = 'http://localhost:5016/api/categories';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  // Méthode pour obtenir les en-têtes d'authentification
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (!token) {
      console.error('Aucun token d\'authentification trouvé');
      return new HttpHeaders({
        'Content-Type': 'application/json'
      });
    }

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Méthode pour extraire le tableau de catégories de la réponse de l'API
  private extractCategoriesArray(response: any): Category[] {
    // Vérifie si la réponse a la structure attendue
    if (response && response.$values && Array.isArray(response.$values)) {
      // Retourne le tableau $values
      return response.$values;
    } else if (Array.isArray(response)) {
      // Si c'est déjà un tableau, le retourner directement
      return response;
    } else {
      console.error('Format de réponse inattendu pour les catégories:', response);
      return []; // Retourner un tableau vide en cas d'erreur
    }
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => this.extractCategoriesArray(response))
    );
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(response => {
        if (response && response.$values && response.$values.length > 0) {
          return response.$values[0];
        } else {
          return response;
        }
      })
    );
  }

  createCategory(category: Category): Observable<Category> {
    const options = {
      headers: this.getAuthHeaders()
    };
    return this.http.post<Category>(this.apiUrl, category, options);
  }

  updateCategory(category: Category): Observable<Category> {
    const options = {
      headers: this.getAuthHeaders()
    };
    return this.http.put<Category>(`${this.apiUrl}/${category.id}`, category, options);
  }

  deleteCategory(id: number): Observable<void> {
    const options = {
      headers: this.getAuthHeaders()
    };
    return this.http.delete<void>(`${this.apiUrl}/${id}`, options);
  }
}
