import winston from 'winston';
import DailyRotateFile = require('winston-daily-rotate-file');
import { config } from './config';

const timeFormat = 'YYYY-MM-DD hh:mm:ss.SSS A';

const { combine, timestamp, printf, align } = winston.format;

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

function formatLogging(options) {
  const { timestamp, level, message, requestId, stack } = options;
  const json = { timestamp, level: level.trim(), message: message.trim(), requestId, stack };

  let format = `[${timestamp}]:`;
  format += requestId ? `${requestId} ` : '';
  format += `${level}: ${message?.trim()}`;

  return { json, message: format };
}

const fileTransportConfig = {
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
  format: combine(
    enumerateErrorFormat(),
    timestamp({ format: timeFormat }),
    printf((options) => JSON.stringify(formatLogging(options).json)),
  ),
}

export const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
      format: combine(
        enumerateErrorFormat(),
        winston.format.colorize(),
        timestamp({ format: timeFormat }),
        align(),
        printf((options) => formatLogging(options).message)
      ),
    }),
    ...(config.FILE_LOGGING ? [
      new DailyRotateFile({
        ...fileTransportConfig,
        filename: 'combined-%DATE%-logs.json',
      }),
      new DailyRotateFile({
        ...fileTransportConfig,
        filename: 'info-%DATE%-logs.json',
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


