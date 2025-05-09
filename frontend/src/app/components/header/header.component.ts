import { Component, HostListener, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isScrolled = false;
  isMenuOpen = false;
  isAdmin = false;
  private isBrowser: boolean;

  constructor(
    public authService: AuthService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    // Check initial scroll position only in browser environment
    if (this.isBrowser) {
      this.checkScroll();
      
      // Vérifier si l'utilisateur est admin
      this.isAdmin = this.authService.isAdmin();
      
      // Déboguer les informations utilisateur
      console.log('Current user:', this.authService.currentUserValue);
      console.log('isAdmin:', this.isAdmin);
      console.log('roleId:', this.authService.currentUserValue?.roleId);
      
      // S'abonner aux changements d'état de connexion
      this.authService.currentUser.subscribe(user => {
        this.isAdmin = this.authService.isAdmin();
        console.log('User changed:', user);
        console.log('isAdmin after change:', this.isAdmin);
        console.log('roleId after change:', user?.roleId);
      });
    }

    // Log user info pour déboguer
/*
    console.log('Current user in header:', this.authService.currentUserValue);
*/
  }

  @HostListener('window:scroll', [])
  checkScroll() {
    // Apply scrolled class when page is scrolled down (only in browser)
    if (this.isBrowser) {
      this.isScrolled = window.scrollY > 10; // Valeur plus faible pour un effet plus subtil
    }
  }

  /**
   * Toggle mobile menu
   */
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  /**
   * Handle keyboard navigation for accessibility
   * @param event Keyboard event
   */
  @HostListener('keydown.escape', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Close menu when ESC key is pressed
    if (event.key === 'Escape' && this.isMenuOpen) {
      this.isMenuOpen = false;

      // Only access document in browser environment
      if (this.isBrowser) {
        // Find and close Bootstrap navbar if it's open
        const navbarToggler = document.querySelector('.navbar-toggler') as HTMLElement;
        const navbarCollapse = document.querySelector('.navbar-collapse') as HTMLElement;

        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          navbarToggler?.click();
        }
      }
    }
  }

  /**
   * Log out the current user
   */
  logout() {
    this.authService.logout();
  }
}
