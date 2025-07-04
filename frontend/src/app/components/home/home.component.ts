import { Component, OnInit, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AuthService } from '../../services/auth.service';
import { APP_BASE_HREF } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0, transform: 'translateY(20px)' })),
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => in', [animate('0.6s ease-out')]),
      transition(':enter', [animate('0.6s ease-out')])
    ]),
    trigger('scaleIn', [
      state('void', style({ opacity: 0, transform: 'scale(0.8)' })),
      state('in', style({ opacity: 1, transform: 'scale(1)' })),
      transition('void => in', [animate('0.5s 0.2s ease-out')]),
      transition(':enter', [animate('0.5s 0.2s ease-out')])
    ])
  ]
})
export class HomeComponent implements OnInit {
  scrollPosition = 0;
  showScrollTop = false;
  featuresVisible = false;
  quoteVisible = false;
  isBrowser: boolean;
  isLoggedIn = false;
  isAdmin = false;
  meditationImagePath: string = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService,
    @Inject(APP_BASE_HREF) private baseHref: string,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.determineImagePath();
  }

  /**
   * Détermine le chemin de l'image en fonction de l'URL actuelle
   */
  private determineImagePath(): void {
    // Par défaut, utiliser le baseHref injecté
    let prefix = this.baseHref;
    
    if (this.isBrowser) {
      // Obtenir le chemin de l'URL actuelle
      const currentPath = window.location.pathname;
      
      // Déterminer le préfixe basé sur l'URL actuelle
      if (currentPath.startsWith('/emilien-dev')) {
        prefix = '/emilien-dev/';
      } else if (currentPath.startsWith('/emilien-prod')) {
        prefix = '/emilien-prod/';
      }
    }
    
    // S'assurer que le préfixe se termine par '/'
    if (!prefix.endsWith('/')) {
      prefix += '/';
    }
    
    // Construire le chemin complet de l'image
    this.meditationImagePath = `${prefix}assets/meditation.png`;
    
    console.log(`Image path set to: ${this.meditationImagePath}`);
  }

  ngOnInit() {
    // Vérifier si nous sommes dans un navigateur avant d'accéder à document
    if (this.isBrowser) {
      this.checkFeatureVisibility();
      this.isLoggedIn = !!this.authService.currentUserValue;
      this.isAdmin = this.authService.isAdmin();
      
      // S'abonner aux changements d'état de connexion
      this.authService.currentUser.subscribe(user => {
        this.isLoggedIn = !!user;
        this.isAdmin = this.authService.isAdmin();
      });
      
      // Écouter les changements de route pour mettre à jour le chemin de l'image si nécessaire
      this.router.events.subscribe(() => {
        this.determineImagePath();
      });
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.isBrowser) {
      this.scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      this.showScrollTop = this.scrollPosition > 400;
      this.checkFeatureVisibility();
    }
  }

  scrollToTop() {
    if (this.isBrowser) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  checkFeatureVisibility() {
    if (!this.isBrowser) {
      return;
    }
    
    // Vérification si les sections sont visibles dans la fenêtre pour déclencher les animations
    const features = document.querySelector('.features-section');
    const quote = document.querySelector('.testimonial-section');
    
    if (features) {
      const featuresPosition = features.getBoundingClientRect().top;
      this.featuresVisible = featuresPosition < window.innerHeight - 100;
    }
    
    if (quote) {
      const quotePosition = quote.getBoundingClientRect().top;
      this.quoteVisible = quotePosition < window.innerHeight - 100;
    }
  }
}
