import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerDef } from '../../docs/swaggerDef';

export const docRouter = express.Router();

const specs = swaggerJsdoc({
  definition: swaggerDef,
  apis: ['src/docs/*.yml', 'src/routes/v1/*.ts', 'src/routes/v2/*.ts'],
});

docRouter.use('/', swaggerUi.serve);
docRouter.get(
  '/',
  swaggerUi.setup(specs, {
    explorer: true,
  }),
);
