import { Request, Response, NextFunction } from 'express';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { IMiddleware } from '../interfaces/IMiddleware';

export class ValidateParamsMiddleware implements IMiddleware {
  #classToValidate: ClassConstructor<object>;

  constructor(classToValidate: ClassConstructor<object>) {
    this.#classToValidate = classToValidate;
  }

  execute(req: Request, res: Response, next: NextFunction): void {
    const instance = plainToClass(this.#classToValidate, req.params);

    validate(instance).then((errors) => {
      if (errors.length) {
        res.status(422).send(errors);
      } else {
        next();
      }
    });
  }
}
