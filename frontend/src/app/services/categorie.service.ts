// src/app/services/category.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import {Category} from '../Models/categorie.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  // URL de l'API directement définie ici
  private apiUrl = 'http://localhost:5016/api/categories';  // Adaptez selon votre configuration

  constructor(private http: HttpClient) { }

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
    return this.http.post<Category>(this.apiUrl, category);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/${category.id}`, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
