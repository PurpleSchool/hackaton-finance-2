import express, { Express } from 'express';
import { inject, injectable } from 'inversify';
import { Server } from 'http';
import { json } from 'body-parser';

/** Utils */
import { TYPES } from './types';
import { ILoggerService } from './logger/ILoggerService';
import { IExceptionFilter as IExceptionFilter } from './errors/IExceptionFilter';
import { AuthMiddleware } from './common/middlewares/auth.middleware';
import { IConfigService } from './config/IConfigService';
import { IPrismaService } from './database/IPrismaService';

/** Entities */
import { IUserController } from './entities/user/interfaces/IUserController';
import { IAccountController } from './entities/account/interfaces/IAccountController';

@injectable()
export class App {
  app: Express;
  server: Server;
  port: number;

  constructor(
    @inject(TYPES.Logger) private _logger: ILoggerService,
    @inject(TYPES.ExceptionFilter) private _exceptionFilter: IExceptionFilter,
    @inject(TYPES.ConfigService) private _configService: IConfigService,
    @inject(TYPES.PrismaService) private _prismaService: IPrismaService,
    @inject(TYPES.UserController) private _userController: IUserController,
    @inject(TYPES.AccountController) private _accountController: IAccountController,
  ) {
    this.app = express();
    this.port = Number(process.env.PORT) || 3333;
  }

  useMiddleware(): void {
    this.app.use(json());
    const authMiddleware = new AuthMiddleware(this._configService.getConfig<string>('SECRET'));
    this.app.use(authMiddleware.execute.bind(authMiddleware));
  }

  useRoutes(): void {
    this.app.use('/auth', this._userController.router);
    this.app.use('/account', this._accountController.router);
  }

  useExceptionFilters(): void {
    this.app.use(this._exceptionFilter.catch.bind(this._exceptionFilter));
  }

  async init(): Promise<void> {
    this.useMiddleware();
    this.useRoutes();
    this.useExceptionFilters();
    await this._prismaService.connect();

    this.server = this.app.listen(this.port);
    this._logger.log(`Server starts up on port http://localhost:${this.port}`);
  }

  close(): void {
    this.server.close();
  }
}
