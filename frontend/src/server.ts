import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { APP_BASE_HREF } from '@angular/common';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Configuration des types MIME
 */
app.use((req, res, next) => {
  if (req.url.endsWith('.js') || req.url.endsWith('.mjs')) {
    res.type('application/javascript');
  }
  next();
});

/**
 * Serve static files from /browser avec ordre de priorité
 * Les routes spécifiques doivent être définies AVANT le middleware express.static général
 */

// 1. Servir les fichiers statiques pour emilien-dev et emilien-prod en priorité
app.use('/emilien-dev/assets', express.static(resolve(browserDistFolder, 'assets'), {
  maxAge: '1y',
  index: false,
  setHeaders: (res, path) => {
    // Log pour debug
    console.log(`Serving static asset: ${path} for /emilien-dev/assets`);
    res.setHeader('X-Asset-Path', path);
  }
}));

app.use('/emilien-prod/assets', express.static(resolve(browserDistFolder, 'assets'), {
  maxAge: '1y',
  index: false,
  setHeaders: (res, path) => {
    console.log(`Serving static asset: ${path} for /emilien-prod/assets`);
    res.setHeader('X-Asset-Path', path);
  }
}));

// 2. Servir les fichiers statiques généraux après
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
    setHeaders: (res, path) => {
      // S'assurer que les fichiers JS et MJS sont servis avec le bon type MIME
      if (path.endsWith('.js') || path.endsWith('.mjs')) {
        res.setHeader('Content-Type', 'application/javascript');
      }
      
      // Log pour debug
      console.log(`Serving general static file: ${path}`);
    }
  }),
);

/**
 * SSR avec détection dynamique du base href
 */
app.use('/**', (req, res, next) => {
  // Si la requête est pour un asset statique, ne pas la traiter avec SSR
  if (req.url.includes('/assets/')) {
    console.log(`Skipping SSR for asset: ${req.url}`);
    return next();
  }
  
  // Détermination dynamique du base href selon l'URL
  let baseHref = '/';
  if (req.originalUrl.startsWith('/emilien-prod')) {
    baseHref = '/emilien-prod/';
  } else if (req.originalUrl.startsWith('/emilien-dev')) {
    baseHref = '/emilien-dev/';
  }

  console.log(`SSR request for: ${req.url} with baseHref: ${baseHref}`);

  angularApp
    .handle(req, {
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue: baseHref, // Définir le baseHref dynamique
        },
      ],
    })
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Démarrage local
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Handler exporté pour Firebase, etc.
 */
export const reqHandler = createNodeRequestHandler(app);
