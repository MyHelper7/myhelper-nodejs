import express, { Router } from 'express';
import { docRouter } from './docs.route';
import { config } from '../../config';
import { authRouter } from './auth.route';
import { accountRouter } from './account.route';
import { requestParser } from '../../middlewares';

type TRoute = { path: string, route: Router };

export const appV1Route = express.Router();

const routes: TRoute[] = [
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/account',
    route: accountRouter,
  },
];

// routes available only in development mode
const devRoutes: TRoute[] = [
  {
    path: '/docs',
    route: docRouter,
  },
];

routes.forEach((route: TRoute) => {
  appV1Route.use(route.path, requestParser, route.route);
});

if (config.DEV_MODE) {
  devRoutes.forEach((route: TRoute) => {
    appV1Route.use(route.path, route.route);
  });
}
