import { Request, Response, NextFunction } from 'express';

import { BaseController } from '../../../common/base.controller';
import { IControllerRoute } from '../../../common/interfaces/IControllerRoute';

export interface IAccountController extends BaseController {
  routes: IControllerRoute[];
  create: (req: Request, res: Response, next: NextFunction) => void;
  update: (req: Request, res: Response, next: NextFunction) => void;
  delete: (req: Request, res: Response, next: NextFunction) => void;
  getById: (req: Request, res: Response, next: NextFunction) => void;
  info: (req: Request, res: Response, next: NextFunction) => void;
}
