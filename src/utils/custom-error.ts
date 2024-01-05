import { ERRORS } from '../constants';


export class BaseError extends Error {
  public statusCode: number;
  public isCritical: boolean = false;
  public stack: any;

  constructor(
    message: string,
    error: Error | null | undefined,
    name: string = ERRORS.INTERNAL_SERVER.KEY,
    statusCode: number = ERRORS.INTERNAL_SERVER.CODE,
    isCritical: boolean = false) {
    super(name);
    this.name = name;
    this.statusCode = statusCode;
    this.message = message || error?.message || '';
    this.isCritical = isCritical;

    if (error?.stack) {
      this.stack = error.stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class BadRequestError extends BaseError {
  constructor(message: string = ERRORS.BAD_REQUEST.MESSAGE, error?: Error) {
    super(message, error, ERRORS.BAD_REQUEST.KEY, ERRORS.BAD_REQUEST.CODE);
  }
}

export class ValidationError extends BaseError {
  constructor(message: string = ERRORS.VALIDATION.MESSAGE, error?: Error) {
    super(message, error, ERRORS.VALIDATION.KEY, ERRORS.VALIDATION.CODE);
  }
}

export class UnprocessableError extends BaseError {
  constructor(message: string = ERRORS.UNPROCESSABLE.MESSAGE, error: Error) {
    super(message || error?.message, error, ERRORS.UNPROCESSABLE.KEY, ERRORS.UNPROCESSABLE.CODE);
  }
}

export class RecordNotFoundError extends BaseError {
  constructor(message: string = ERRORS.RECORD_NOT_FOUND.MESSAGE, error?: Error) {
    super(message, error, ERRORS.RECORD_NOT_FOUND.KEY, ERRORS.RECORD_NOT_FOUND.CODE);
  }
}

export class RouteNotFoundError extends BaseError {
  constructor(message: string = ERRORS.ROUTE_NOT_FOUND.MESSAGE) {
    super(message, null, ERRORS.ROUTE_NOT_FOUND.KEY, ERRORS.ROUTE_NOT_FOUND.CODE);
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message: string = ERRORS.UNAUTHORIZED.MESSAGE) {
    super(message, null, ERRORS.UNAUTHORIZED.KEY, ERRORS.UNAUTHORIZED.CODE);
  }
}

export class InternalServerError extends BaseError {
  constructor(error: Error, message: string = ERRORS.INTERNAL_SERVER.MESSAGE, ) {
    super(message || error?.message || '', error, ERRORS.INTERNAL_SERVER.KEY, ERRORS.INTERNAL_SERVER.CODE, true);
  }
}

export class APICallError extends BaseError {
  constructor(message: string = ERRORS.API_CALL.MESSAGE, error: Error) {
    super(message || error?.message || '', error, ERRORS.API_CALL.KEY, ERRORS.API_CALL.CODE, true);
  }
}

export class DatabaseError extends BaseError {
  constructor(message: string = ERRORS.DATABASE.MESSAGE, error?: Error) {
    super(message || error?.message || '', error, ERRORS.DATABASE.KEY, ERRORS.DATABASE.CODE, true);
  }
}

export class FirebaseError extends BaseError {
  constructor(message: string = ERRORS.FIREBASE.MESSAGE, error?: Error) {
    super(message || error?.message || '', error, ERRORS.FIREBASE.KEY, ERRORS.FIREBASE.CODE, true);
  }
}
