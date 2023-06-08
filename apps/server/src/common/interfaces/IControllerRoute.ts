import { Request, Response, NextFunction, Router } from 'express';
import { IMiddleware } from './IMiddleware';

export interface IControllerRoute {
  path: string;
  method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'put'>;
  callback: (req: Request, res: Response, next: NextFunction) => void;
  middlewares?: IMiddleware[];
}

export type ExpressReturnType = Response<any, Record<string, any>>;
