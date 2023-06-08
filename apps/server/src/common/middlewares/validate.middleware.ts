import { Request, Response, NextFunction } from 'express';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { IMiddleware } from '../interfaces/IMiddleware';

export class ValidateMiddleware implements IMiddleware {
  #classToValidate: ClassConstructor<object>;

  constructor(classToValidate: ClassConstructor<object>) {
    this.#classToValidate = classToValidate;
  }

  execute({ body }: Request, res: Response, next: NextFunction): void {
    const instance = plainToClass(this.#classToValidate, body);

    validate(instance).then((errors) => {
      if (errors.length) {
        res.status(422).send(errors);
      } else {
        next();
      }
    });
  }
}
