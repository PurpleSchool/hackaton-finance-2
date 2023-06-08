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

/** Utils */
import { ConfigService } from './config/config.service';
import { PrismaService } from './database/prisma.service';
import { LoggerService } from './logger/logger.service';
import { ExceptionFilter } from './errors/ExceptionFilter';

/** Entities */
import { UserController } from './entities/user/user.controller';
import { UserService } from './entities/user/user.service';
import { UserRepository } from './entities/user/user.repository';

import { App } from './app';

export interface IBootstrapReturn {
  appContainer: Container;
  app: App;
}

/** Inversion of control container */
export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<App>(TYPES.Application).to(App);
  bind<IUserController>(TYPES.UserController).to(UserController);
  bind<IUserService>(TYPES.UserService).to(UserService);
  bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
  bind<ILoggerService>(TYPES.Logger).to(LoggerService).inSingletonScope();
  bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
  bind<IPrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
  bind<IUserRepository>(TYPES.UserRepository).to(UserRepository).inSingletonScope();
});

async function bootstrap(): Promise<IBootstrapReturn> {
  const appContainer = new Container();
  appContainer.load(appBindings);

  const app = appContainer.get<App>(TYPES.Application);
  await app.init();

  return { app, appContainer };
}

export const boot = bootstrap();
