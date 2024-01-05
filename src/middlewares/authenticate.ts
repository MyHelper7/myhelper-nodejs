import { userDAL } from '../dal';
import { tokenService } from '../services';
import { INextFunction, IRequest, IResponse } from '../types';
import { BadRequestError, UnauthorizedError } from '../utils';
import { errorHandler } from './error-handler';

export const auth = (...validRoles) => async (req: IRequest, res: IResponse, next: INextFunction) => {
  try {
    const token = req.headers?.authorization?.split(' ')?.[1];
    if (!token) {
      throw new BadRequestError('Token is missing');
    }
    try {
      const decoded = tokenService.verifyAccessToken(token);
      req.user = (await userDAL.findOne({ id: decoded.sub }));
    } catch(error) {
      throw new BadRequestError('Invalid Token');
    }
    
    if (validRoles?.length) { 
      const roles = Array.isArray(validRoles) ? validRoles : [validRoles];
      if (!roles.includes(req.user.role)) {
        throw new UnauthorizedError();
      }
    }
    next();
  } catch(error: any) {
    errorHandler.responseError(error, req, res, next);
  }
};