export const NODE_ENVIRONMENT = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
};

export const isDevelopment = (): boolean => {
  return [undefined, NODE_ENVIRONMENT.DEVELOPMENT].includes(process.env.NODE_ENV);
};

export const isProduction = (): boolean => {
  return [NODE_ENVIRONMENT.PRODUCTION].includes(process.env.NODE_ENV || '');
};

export const DATE_FORMAT = {
  YYYY_MM_DD: 'YYYY-MM-DD',
};

export const TOKEN_TYPE = {
  ACCESS: 'access',
};
