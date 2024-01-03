import { NextFunction, Request, Response } from 'express';

export const catchAsync = (callback: (req: Request, res: Response) => void) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(callback(req, res)).catch((err) => next(err));
};
