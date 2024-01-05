import { INextFunction, IRequest, IResponse } from '../types';
import { logger } from '../config';
import { appHelper, requestHelper } from '../helpers';

export const requestLogger = (req: IRequest, res: IResponse, next: INextFunction) => {
  const startTimestamp = Date.now();
  const method = req.method;
  const url = req.originalUrl;
  const requestId = appHelper.uuidV4().slice(0, 12);
  logger.defaultMeta = { requestId: requestId };
  req.clientIP = requestHelper.getClientIp(req);

  logger.info(`Request: ${method}: ${url}`);

  res.once('finish', () => {
    const durationInMilliseconds = Date.now() - startTimestamp;
    logger.info(`Response: ${method}: ${url} : ${res.statusCode} - ${durationInMilliseconds.toLocaleString()}ms`);
  });
  next();
};
