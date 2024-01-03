import { Request, Response, NextFunction } from 'express';
import { config, logger } from '../config';
import { HTTP_STATUS } from '../constants';
import { BaseError, InternalServerError } from '../utils';
import { slack } from '../utils';

class ErrorHandler {
  public async convertError(err: Error, req: Request, res: Response, next: NextFunction) {
    let error = err;
    if (!(error instanceof BaseError)) {
      error = new InternalServerError(err);
    }
    next(error);
  }

  public responseError(error: BaseError, req: Request, res: Response, next: NextFunction) {
    const { statusCode, name, stack, isCritical } = error;
  
    const code = statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
    res.locals.errorMessage = error?.message;
  
    const response = {
      name,
      code,
      message: error?.message,
      ...(config.DEV_MODE ? { stack } : null),
    };

    if (isCritical) {
      slack.notifyError({
        method: req.method,
        url: `${req.hostname}${req.originalUrl}`,
        params: req.params,
        body: req.body,
        query: req.query,
        name: response.name,
        message: response.message,
        code: response.code,
        stack: stack,
      });
    }
  
    res.status(response.code).send(response);
  };

  public logServerError(type: string, error?: Error | string) {
    logger.info(`[${type}]: Server encounter issue.`, (error instanceof Error ? error : new Error(error)));
  }
}

export const errorHandler = new ErrorHandler();

