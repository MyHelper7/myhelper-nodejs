import { INextFunction, IRequest, IResponse } from '../types';
import { config, logger } from '../config';
import { HTTP_STATUS } from '../constants';
import { BadRequestError, BaseError, DatabaseError, InternalServerError } from '../utils';
import { slack } from '../utils';
import { appHelper } from '../helpers';

class ErrorHandler {
  public async convertError(err: Error, _req: IRequest, _res: IResponse, next: INextFunction) {
    let error = err;
    if (!(error instanceof BaseError)) {
      error = new InternalServerError(err, config.DEV_MODE ? err.message : '');
    }
    next(error);
  }

  public responseError(error: BaseError, req: IRequest, res: IResponse, _next: INextFunction) {
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
        requestId: req.requestId,
        clientIP: req.clientIP,
        method: req.method,
        url: `${req.hostname}${req.originalUrl}`,
        params: appHelper.removeListedKeys(req.params, 'params'),
        body: appHelper.removeListedKeys(req.body, 'body'),
        query: appHelper.removeListedKeys(req.query, 'query'),
        name: response.name,
        message: response.message,
        code: response.code,
        stack: stack,
      });

      logger.error(JSON.stringify({...error, message: error.message, stack: error.stack}));
    }
  
    res.status(response.code).send(response);
  };

  public logServerError(type: string, error?: Error | string) {
    logger.info(`[${type}]: Server encounter issue.`, (error instanceof Error ? error : new Error(error)));

    slack.notifyUnhandleError({ type, error });
  }

  public handleDBError(error: any) {
    let dbError: boolean = true;
    const messages: any[] = [];
    if (error.errors) {
      dbError = false;
      for (const err of error.errors) {
        dbError = !(err.type.indexOf('unique') > -1);
        messages.push(err.message);
      }
    }
    const errorClass = dbError ? DatabaseError : BadRequestError;
    return { message: messages.join(', '), errorClass };
  }
}

export const errorHandler = new ErrorHandler();

