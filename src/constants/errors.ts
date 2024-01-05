import httpStatus from 'http-status';

export const HTTP_STATUS = httpStatus;

export const ERRORS = {
  INTERNAL_SERVER: {
    KEY: 'internal_server_error',
    CODE: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    MESSAGE: 'Internal Server Error'
  },
  DATABASE: {
    KEY: 'database_error',
    CODE: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    MESSAGE: 'Database Error'
  },
  FIREBASE: {
    KEY: 'firebase_error',
    CODE: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    MESSAGE: 'Firebase Error'
  },
  API_CALL: {
    KEY: 'api_error',
    CODE: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    MESSAGE: 'API Call Error'
  },
  BAD_REQUEST: {
    KEY: 'bad_request_error',
    CODE: HTTP_STATUS.BAD_REQUEST,
    MESSAGE: 'Bad Request'
  },
  UNAUTHORIZED: {
    KEY: 'unauthorized_error',
    CODE: HTTP_STATUS.UNAUTHORIZED,
    MESSAGE: 'Unauthorized'
  },
  VALIDATION: {
    KEY: 'validation_error',
    CODE: HTTP_STATUS.NOT_ACCEPTABLE,
    MESSAGE: 'Validation Error'
  },
  UNPROCESSABLE: {
    KEY: 'unprocessable_error',
    CODE: HTTP_STATUS.UNPROCESSABLE_ENTITY,
    MESSAGE: 'Unprocessable Error'
  },
  ROUTE_NOT_FOUND: {
    KEY: 'route_not_found',
    CODE: HTTP_STATUS.NOT_FOUND,
    MESSAGE: 'Route Not Found'
  },
  RECORD_NOT_FOUND: {
    KEY: 'record_not_found',
    CODE: HTTP_STATUS.NOT_FOUND,
    MESSAGE: 'Record Not Found'
  },
  UNSUPPORTED_MEDIA: {
    KEY: 'unsupported_media',
    CODE: HTTP_STATUS.UNSUPPORTED_MEDIA_TYPE,
    MESSAGE: 'Unsupported media'
  }
};
