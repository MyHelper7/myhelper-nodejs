import { IRequest } from '../types';

class RequestHelper {
  public getClientIp(req: IRequest): string {
    return (<string>req.headers['x-forwarded-for'])?.split(',').shift() || req.socket.remoteAddress || req.ip || '';
  };
}

export const requestHelper = new RequestHelper();
