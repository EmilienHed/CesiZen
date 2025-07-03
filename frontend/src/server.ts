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
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * SSR avec détection dynamique du base href
 */
app.use('/**', (req, res, next) => {
  // Détermination dynamique du base href selon l'URL
  let baseHref = '/';
  if (req.originalUrl.startsWith('/emilien-prod')) {
    baseHref = '/emilien-prod/';
  } else if (req.originalUrl.startsWith('/emilien-dev')) {
    baseHref = '/emilien-dev/';
  }

  angularApp
    .handle(req, {
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue: baseHref,
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
