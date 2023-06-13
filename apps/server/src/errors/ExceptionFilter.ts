import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';

import { TYPES } from '../types';
import { ILoggerService } from '../logger/ILoggerService';
import { IExceptionFilter } from './IExceptionFilter';
import { HttpError } from './HttpError';

@injectable()
export class ExceptionFilter implements IExceptionFilter {
  constructor(@inject(TYPES.Logger) private _logger: ILoggerService) {}

  catch(err: Error | HttpError, req: Request, res: Response, next: NextFunction): void {
    if (err instanceof HttpError) {
      this._logger.error(`[${err.context}] ERROR ${err.statusCode}: ${err.message}`);
      res.status(err.statusCode).send({ err: err.message });
    } else {
      this._logger.error(`${err.message}`);
      res.status(500).send({ err: err.message });
    }
  }
}
