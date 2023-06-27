import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';

import { TYPES } from '../../types';
import { BaseController } from '../../common/base.controller';
import { IControllerRoute } from '../../common/interfaces/IControllerRoute';
import { IAccountController } from './interfaces/IAccountController';
import { IAccountService } from './interfaces/IAccountService';
import { ILoggerService } from '../../logger/ILoggerService';
import { IConfigService } from '../../config/IConfigService';

import { LoginMiddleware } from '../../common/middlewares/login.middleware';
import { ValidateMiddleware } from '../../common/middlewares/validate.middleware';
import { ValidateParamsMiddleware } from '../../common/middlewares/validate-params.middleware';
import { HttpError } from '../../errors/HttpError';

import { AccountCreateDto } from './dto/account-create.dto';
import { AccountUpdateDto } from './dto/account-update.dto';
import { AccountGetByIdDto } from './dto/account-get-by-id.dto';

@injectable()
export class AccountController extends BaseController implements IAccountController {
  readonly routes: IControllerRoute[] = [
    {
      path: '/info',
      method: 'get',
      callback: this.info,
    },
    {
      path: '/create',
      method: 'post',
      callback: this.create,
      middlewares: [new ValidateMiddleware(AccountCreateDto)],
    },
    {
      path: '/:id',
      method: 'put',
      callback: this.update,
      middlewares: [
        new ValidateMiddleware(AccountUpdateDto),
        new ValidateParamsMiddleware(AccountGetByIdDto),
      ],
    },
    {
      path: '/:id',
      method: 'delete',
      callback: this.delete,
      middlewares: [new ValidateParamsMiddleware(AccountGetByIdDto)],
    },
    {
      path: '/:id',
      method: 'get',
      callback: this.getById,
      middlewares: [new ValidateParamsMiddleware(AccountGetByIdDto)],
    },
  ];

  constructor(
    @inject(TYPES.ConfigService) private _configService: IConfigService,
    @inject(TYPES.Logger) private _logger: ILoggerService,
    @inject(TYPES.AccountService) private _accountService: IAccountService,
  ) {
    super(_logger);

    const loginMiddleware = new LoginMiddleware(this._configService.getConfig<string>('SECRET'));

    this.routes = this.routes.map((route) => {
      return {
        ...route,
        middlewares: [...(route.middlewares || []), loginMiddleware],
      };
    });

    this.bindRoutes(this.routes);
  }

  public async create(
    req: Request<any, any, AccountCreateDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = Number(req.userId);
      const body = req.body;
      body.userId = userId;
      const result = await this._accountService.createAccount(body);
      if (!result) {
        return next(new HttpError(401, 'Account error', 'Create'));
      }

      this.success(res, result);
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = Number(req.userId);
      const accountId = Number(req.params.id);
      const accountData = req.body;
      accountData.userId = userId;
      const result = await this._accountService.updateAccount(accountId, accountData);
      if (!result) {
        return next(new HttpError(401, 'Account error', 'Update'));
      }

      this.success(res, result);
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = Number(req.userId);
      const accountId = Number(req.params.id);
      const result = await this._accountService.deleteAccount(accountId, userId);
      if (!result) {
        return next(new HttpError(401, 'Account error', 'Delete'));
      }

      this.success(res, result);
    } catch (error) {
      next(error);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = Number(req.userId);
      const accountId = Number(req.params.id);
      const result = await this._accountService.getAccountById(accountId, userId);
      if (!result) {
        throw new HttpError(404, 'Account not found', 'Get');
      }

      this.success(res, result);
    } catch (error) {
      next(error);
    }
  }

  public async info(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = Number(req.userId);
      const result = await this._accountService.getAccounts(userId);
      if (!result) {
        throw new HttpError(404, 'Accounts not found', 'Get');
      }

      this.success(res, result);
    } catch (error) {
      next(error);
    }
  }
}
