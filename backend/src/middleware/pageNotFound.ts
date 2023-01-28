import { Response, Request, NextFunction } from 'express';

export const pageNotFound = (req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({
    message: 'Page not Found',
    route: req.originalUrl,
    method: req.method,
    status: 404,
    code: 0,
  });
};
