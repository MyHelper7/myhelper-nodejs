import { logger } from '../config/logger';

let requestId = 1;
export const requestLogger = (req, res, next) => {
  const startTimestamp = Date.now();
  const method = req.method;
  const url = req.originalUrl;
  process['requestId'] = requestId;

  logger.info(`Request #${requestId}: ${method}: ${url}`);

  res.once('finish', () => {
    const durationInMilliseconds = Date.now() - startTimestamp;
    logger.info(`Response #${requestId}: ${method}: ${url} : ${res.statusCode} - ${durationInMilliseconds.toLocaleString()}ms`);
    requestId++;
  });
  next();
};
