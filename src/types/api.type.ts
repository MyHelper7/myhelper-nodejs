import { Request, Response, NextFunction } from 'express';
import { User } from '../models';

export interface IRequest extends Request {
  user?: User;
  requestId?: string;
  clientIP?: string;
}

export interface IResponse extends Response {
}
export interface INextFunction extends NextFunction {
}
