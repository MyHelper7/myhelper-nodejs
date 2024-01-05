import { INextFunction, IRequest, IResponse } from '../types';

export const catchAsync = (callback: (req: IRequest, res: IResponse) => void) => (req: IRequest, res: IResponse, next: INextFunction) => {
  Promise.resolve(callback(req, res)).catch((err) => next(err));
};
