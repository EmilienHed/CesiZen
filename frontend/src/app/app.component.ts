import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event as RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AssetPathDirective } from './directives/asset-path.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    AssetPathDirective
  ]
})
export class AppComponent implements OnInit {
  isAuthPage: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // S'abonner aux événements de changement de route
    this.router.events.pipe(
      filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Vérifier si l'URL actuelle est une page d'authentification
      // Ajouter '/register' pour inclure la page d'inscription
      this.isAuthPage = event.urlAfterRedirects === '/login' || event.urlAfterRedirects === '/inscription';
    });

    // Vérifier l'URL initiale
    const currentUrl = this.router.url;
    this.isAuthPage = currentUrl === '/login' || currentUrl === '/inscription';
  }
}
