import { config } from '../config/config';

export const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: `${config.SERVER.NAME} API documentation`,
    version: '1.0.1',
  },
  servers: [
    {
      url: `${config.SERVER.URL}/api`,
      host: `${config.SERVER.PROTOCOL}`,
    },
  ],
};

