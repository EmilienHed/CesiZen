import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  private isBrowser: boolean;
  private _apiUrl: string;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this._apiUrl = environment.apiUrl;

    // Si on est dans le navigateur, on peut détecter l'environnement
    if (this.isBrowser) {
      const hostname = window.location.hostname;
      const port = window.location.port;
      
      console.log(`EnvironmentService: hostname=${hostname}, port=${port}`);
      
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        // Développement local
        if (port === '4200') {
          // Angular dev server
          this._apiUrl = 'http://localhost:5016/api';
          console.log('EnvironmentService: Détecté Angular dev server sur port 4200');
        } else if (port === '4000') {
          // Docker
          this._apiUrl = '/api';
          console.log('EnvironmentService: Détecté Docker sur port 4000');
        } else {
          // Par défaut
          this._apiUrl = 'http://localhost:5016/api';
          console.log('EnvironmentService: Utilisation de la configuration par défaut');
        }
      } else if (hostname === 'rasphubert.ddns.net') {
        // Environnement de production ou développement sur le serveur
        if (window.location.pathname.startsWith('/emilien-dev')) {
          // Environnement de développement sur le serveur
          this._apiUrl = '/emilien-dev/api';
          console.log('EnvironmentService: Détecté environnement dev sur serveur');
        } else if (window.location.pathname.startsWith('/emilien-prod')) {
          // Environnement de production sur le serveur
          this._apiUrl = '/emilien-prod/api';
          console.log('EnvironmentService: Détecté environnement prod sur serveur');
        } else {
          // Environnement par défaut
          this._apiUrl = '/api';
          console.log('EnvironmentService: Utilisation de la configuration serveur par défaut');
        }
      }
      
      console.log(`EnvironmentService: API URL configurée à ${this._apiUrl}`);
    }
  }

  get apiUrl(): string {
    return this._apiUrl;
  }
} 