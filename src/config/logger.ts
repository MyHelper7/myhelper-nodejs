import winston from 'winston';
import DailyRotateFile = require("winston-daily-rotate-file");
import { config } from './config';

const timeFormat = 'YYYY-MM-DD hh:mm:ss.SSS A';

const { combine, timestamp, printf, align } = winston.format;

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const fileTransportConfig = {
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
  format: combine(
    enumerateErrorFormat(),
    timestamp({ format: timeFormat }),
    printf(({ level, message }) => {
      const requestId = process?.['requestId'] || '-';
      return JSON.stringify({level: level.trim(), requestId, message: message?.trim()});
    }),
  ),
}

export const logger = winston.createLogger({
  level: 'info',
  format: combine(
    enumerateErrorFormat(),
    winston.format.colorize(),
    timestamp({ format: timeFormat }),
    align(),
    printf(({ timestamp, level, message }) => {
      const requestId = process?.['requestId'] || '-';
      return `[${timestamp}]:${requestId} ${level}: ${message?.trim()}`;
    }),
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
    ...(config.FILE_LOGGING ? [
      new DailyRotateFile({
        ...fileTransportConfig,
        filename: 'combined-%DATE%.json',
      }),
      new DailyRotateFile({
        ...fileTransportConfig,
        filename: 'info-%DATE%.json',
        level: 'info',
      }),
      new DailyRotateFile({
        ...fileTransportConfig,
        filename: 'error-%DATE%.json',
        level: 'error',
      }),
    ] : [])
  ],
});


