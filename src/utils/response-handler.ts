import { Request, Response } from 'express';
import { HTTP_STATUS } from '../constants';

export const successResponse = function(
  _: Request,
  res: Response,
  data: unknown,
  statusCode: number = HTTP_STATUS.OK) {
  return res.status(statusCode).send(data);
};
