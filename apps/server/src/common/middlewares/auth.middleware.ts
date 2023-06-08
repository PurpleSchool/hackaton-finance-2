import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { IMiddleware } from '../interfaces/IMiddleware';

export class AuthMiddleware implements IMiddleware {
  #secret: string;

  constructor(secret: string) {
    this.#secret = secret;
  }

  #verifyToken(req: Request, accessToken: string, next: NextFunction): Promise<string> {
    return new Promise((resolve) => {
      verify(accessToken, this.#secret, (e: unknown, payload) => {
        if (e) {
          next();
        } else if (payload && typeof payload === 'object') {
          resolve(payload.email);
        }
      });
    });
  }

  async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (!req.headers.authorization) next();

    if (req.headers.authorization) {
      const accessToken = req.headers.authorization.split(' ')[1];
      const data = await this.#verifyToken(req, accessToken, next);
      if (data) {
        req.email = data;
        next();
      }
    }
  }
}
