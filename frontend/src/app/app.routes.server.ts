import { RenderMode, ServerRoute } from '@angular/ssr';
import {environment} from '../environments/environment';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'respiration/practice/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const response = await fetch(`${environment.apiUrl}/respiration-practices`);
      const items = await response.json();
      return items.map((item: any) => ({ id: item.id }));
    }
  },
  {
    path: 'articles/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const response = await fetch(`${environment.apiUrl}/articles`);
      const articles = await response.json();
      return articles.map((article: any) => ({ id: article.id }));
    }
  },
  {
    path: 'admin/articles/edit/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const response = await fetch(`${environment.apiUrl}/articles`);
      const articles = await response.json();
      return articles.map((article: any) => ({ id: article.id }));
    }
  },
  {
    path: 'admin/users/edit/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const response = await fetch(`${environment.apiUrl}/users`);
      const users = await response.json();
      return users.map((user: any) => ({ id: user.id }));
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
