import { IRequest, IResponse } from '../types';
import { HTTP_STATUS } from '../constants';
import { appHelper } from '../helpers';

export const successResponse = function(
  _req: IRequest,
  res: IResponse,
  data: any,
  options: any = {}) {
  const { statusCode = HTTP_STATUS.OK, snakeCase = true } = options;
  return res.status(statusCode).send(snakeCase ? appHelper.convertKeysToSnakeCase(data) : data);
};
