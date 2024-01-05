import Joi from 'joi';
import { NODE_ENVIRONMENT } from '../constants';


const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid(NODE_ENVIRONMENT.PRODUCTION, NODE_ENVIRONMENT.DEVELOPMENT).default(NODE_ENVIRONMENT.DEVELOPMENT),
    PORT: Joi.number().default(3000),
    SERVER_URL: Joi.string().optional().default('http://localhost:3000'),
    SERVER_NAME: Joi.string().default('myhelper-nodejs'),
    SERVER_PROTOCOL: Joi.string().default('http'),

    DEV_MODE: Joi.boolean().default(false),
    FILE_LOGGING: Joi.boolean().default(false),

    DATABASE_NAME: Joi.string().required().description('Database name is required'),
    DATABASE_HOST: Joi.string().required().description('Database host is required'),
    DATABASE_PORT: Joi.string().description('Database port is required').default(5432),
    DATABASE_USER: [Joi.string().required().description('Database user must be string'), Joi.allow(null)],
    DATABASE_PASSWORD: [Joi.string().required().description('Database password must be string'), Joi.allow(null)],
    DATABASE_DIALECT: Joi.string().description('Database dialect is required').default('postgres'),
    DATABASE_LOGGING: Joi.boolean().default(false),

    NOTIFY_SLACK: Joi.boolean().default(false),
    SLACK_ERROR_WEBHOOK: Joi.string().uri().description('Slack Error Webhook is required'),

    JWT_ACCESS_PRIVATE_KEY: Joi.string().required().description('JWT access private key'),
    JWT_ACCESS_PUBLIC_KEY: Joi.string().required().description('JWT access public key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('Minutes after which access tokens expire'),
    JWT_ACCESS_ALGORITHM: Joi.string().required().description('JWT access algorithm'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
  NODE_ENV: envVars.NODE_ENV,
  SERVER: {
    NAME: envVars.SERVER_NAME,
    PROTOCOL: envVars.SERVER_PROTOCOL,
    URL: envVars.SERVER_URL,
    PORT: envVars.PORT,
  },
  DEV_MODE: envVars.DEV_MODE,
  FILE_LOGGING: envVars.FILE_LOGGING,

  DATABASE: {
    NAME: envVars.DATABASE_NAME,
    HOST: envVars.DATABASE_HOST,
    PORT: envVars.DATABASE_PORT,
    USER: envVars.DATABASE_USER,
    PASSWORD: envVars.DATABASE_PASSWORD,
    DIALECT: envVars.DATABASE_DIALECT,
    LOGGING: envVars.DATABASE_LOGGING,
  },

  SLACK : {
    NOTIFY: envVars.NOTIFY_SLACK,
    ERROR_WEBHOOK: envVars.SLACK_ERROR_WEBHOOK,
  },

  SALT: {
    ACCOUNT: envVars.ACCOUNT_SALT,
    RESET_PASSWORD: envVars.RESET_PASSWORD_SALT,
    VERIFY_ACCOUNT: envVars.VERIFY_ACCOUNT_SALT,
  },

  JWT: {
    ACCESS_PRIVATE_KEY: envVars.JWT_ACCESS_PRIVATE_KEY,
    ACCESS_PUBLIC_KEY: envVars.JWT_ACCESS_PUBLIC_KEY,
    ACCESS_EXPIRATION_MINUTES: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    ACCESS_ALGORITHM: envVars.JWT_ACCESS_ALGORITHM,
  },
};

