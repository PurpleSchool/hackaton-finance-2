import 'reflect-metadata';
import { Container, ContainerModule, interfaces } from 'inversify';

/** Interfaces */
import { TYPES } from './types';
import { ILoggerService } from './logger/ILoggerService';
import { IExceptionFilter as IExceptionFilter } from './errors/IExceptionFilter';
import { IConfigService } from './config/IConfigService';
import { IPrismaService } from './database/IPrismaService';
import { IUserController } from './entities/user/interfaces/IUserController';
import { IUserService } from './entities/user/interfaces/IUserService';
import { IUserRepository } from './entities/user/interfaces/IUserRepository';
import { IAccountController } from './entities/account/interfaces/IAccountController';
import { IAccountService } from './entities/account/interfaces/IAccountService';
import { IAccountRepository } from './entities/account/interfaces/IAccountRepository';
import { ICategoryController } from './entities/category/interfaces/ICategoryController';
import { ICategoryService } from './entities/category/interfaces/ICategoryService';
import { ICategoryRepository } from './entities/category/interfaces/ICategoryRepository';

/** Utils */
import { ConfigService } from './config/config.service';
import { PrismaService } from './database/prisma.service';
import { LoggerService } from './logger/logger.service';
import { ExceptionFilter } from './errors/ExceptionFilter';

/** Entities */
import { UserController } from './entities/user/user.controller';
import { UserService } from './entities/user/user.service';
import { UserRepository } from './entities/user/user.repository';
import { AccountController } from './entities/account/account.controller';
import { AccountService } from './entities/account/account.service';
import { AccountRepository } from './entities/account/account.repository';
import { CategoryController } from './entities/category/category.controller';
import { CategoryService } from './entities/category/category.service';
import { CategoryRepository } from './entities/category/category.repository';
import { App } from './app';

export interface IBootstrapReturn {
  appContainer: Container;
  app: App;
}

/** Inversion of control container */
export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<App>(TYPES.Application).to(App);
  bind<IUserController>(TYPES.UserController).to(UserController);
  bind<IAccountController>(TYPES.AccountController).to(AccountController);
  bind<ICategoryController>(TYPES.CategoryController).to(CategoryController);
  bind<IUserService>(TYPES.UserService).to(UserService);
  bind<IAccountService>(TYPES.AccountService).to(AccountService);
  bind<ICategoryService>(TYPES.CategoryService).to(CategoryService);
  bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
  bind<ILoggerService>(TYPES.Logger).to(LoggerService).inSingletonScope();
  bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
  bind<IPrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
  bind<IUserRepository>(TYPES.UserRepository).to(UserRepository).inSingletonScope();
  bind<IAccountRepository>(TYPES.AccountRepository).to(AccountRepository).inSingletonScope();
  bind<ICategoryRepository>(TYPES.CategoryRepository).to(CategoryRepository).inSingletonScope();
});

async function bootstrap(): Promise<IBootstrapReturn> {
  const appContainer = new Container();
  appContainer.load(appBindings);

  const app = appContainer.get<App>(TYPES.Application);
  await app.init();

  return { app, appContainer };
}

export const boot = bootstrap();
