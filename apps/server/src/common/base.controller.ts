import { Response, Router } from 'express';
import { injectable } from 'inversify';

import { ExpressReturnType, IControllerRoute } from './interfaces/IControllerRoute';
import { IMiddleware } from './interfaces/IMiddleware';
import { ILoggerService } from '../logger/ILoggerService';

@injectable()
export abstract class BaseController {
  #router: Router;
  #loggerService: ILoggerService;

  constructor(loggerService: ILoggerService) {
    this.#router = Router();
    this.#loggerService = loggerService;
  }

  get router(): Router {
    return this.#router;
  }

  created(res: Response): ExpressReturnType {
    return res.sendStatus(201);
  }

  send<T>(res: Response, code: number, message: T): ExpressReturnType {
    res.type('application/json');
    return res.status(code).json(message);
  }

  success<T>(res: Response, message: T): ExpressReturnType {
    return this.send<T>(res, 200, message);
  }

  error<T>(res: Response, message: T): ExpressReturnType {
    return this.send<T>(res, 500, message);
  }

  protected bindRoutes(routes: IControllerRoute[]): void {
    for (const route of routes) {
      this.#loggerService.log(`[${route.method.toUpperCase()}] ${route.path}`);
      console.log(route);
      const middleware = (route.middlewares || []).map((item: IMiddleware) =>
        item.execute.bind(item),
      );

      const routeHandler = route.callback.bind(this);

      const pipeline =
        middleware && middleware.length ? [...middleware, routeHandler] : routeHandler;

      this.#router[route.method](route.path, pipeline);
    }
  }
}
