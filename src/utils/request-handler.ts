import axios from 'axios';
import { logger } from '../config/logger';
import { APICallError } from './custom-error';

class RequestHandler {
  public async request({ url, method, body = {} }) {
    try {
      logger.info(`Calling api: ${url}`);
      const response = await axios({
        method,
        url,
        headers: {
          'Content-Type': 'application/json',
        },
        ...((method.toLowerCase() != 'get') ? { data: body || {} } : null),
      });
      return response?.data || {};
    } catch (error: any) {
      throw new APICallError(error.message, error);
    }
  }
}

export const requestHandler = new RequestHandler();
