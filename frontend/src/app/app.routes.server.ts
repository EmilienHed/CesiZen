import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'respiration/practice/:id',
    renderMode: RenderMode.Server  // Désactive le prerender statique ici
  },
  {
    path: 'articles/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'admin/articles/edit/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'admin/users/edit/:id',
    renderMode: RenderMode.Server
  },
  // Pour toutes les autres routes sans paramètre dynamique, tu peux garder Prerender
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
