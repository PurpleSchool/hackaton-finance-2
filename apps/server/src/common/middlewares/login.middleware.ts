import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { IMiddleware } from '../interfaces/IMiddleware';

type TokenData = {
  userId: string;
  email: string;
};

export class LoginMiddleware implements IMiddleware {
  #secret: string;

  constructor(secret: string) {
    this.#secret = secret;
  }

  #verifyToken(req: Request, accessToken: string, next: NextFunction): Promise<TokenData> {
    return new Promise((resolve, reject) => {
      verify(accessToken, this.#secret, (err: unknown, payload: TokenData) => {
        if (err) {
          return reject(err);
        } else if (payload && typeof payload === 'object') {
          resolve(payload);
        }
      });
    });
  }

  async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (!req.headers.authorization) {
      return next(new Error('Missing Auth'));
    }
    const accessToken = req.headers.authorization.split(' ')[1];
    try {
      const tokenData = await this.#verifyToken(req, accessToken, next);
      if (!tokenData.userId) {
        return next(new Error('Missing Auth'));
      }
      req.userId = tokenData.userId;
      req.email = tokenData.email;
      next();
    } catch (error) {
      next(error);
    }
  }
}
