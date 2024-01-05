import { INextFunction, IRequest, IResponse } from '../types';
import { appHelper } from '../helpers';

export const requestParser = (req: IRequest, _res: IResponse, next: INextFunction) => {
  req.params = appHelper.convertKeysToCamelCase(req.params);
  req.body = appHelper.convertKeysToCamelCase(req.body);
  req.query = appHelper.convertKeysToCamelCase(req.query);

  next();
};
