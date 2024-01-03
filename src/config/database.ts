
import { Sequelize } from 'sequelize';
import { config } from './config';
import { logger } from './logger';


export const database = new Sequelize(config.DATABASE.NAME, config.DATABASE.USER, config.DATABASE.PASSWORD, {
  host: config.DATABASE.HOST,
  port: config.DATABASE.PORT,
  dialect: config.DATABASE.DIALECT,
  dialectOptions: {
    decimalNumbers: true,
  },
  define: {
    underscored: true,
  },
  logging: config.DATABASE.LOGGING ? (msg) => logger.info(msg) : false,
});
