import { User as UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';

import { TYPES } from '../../types';
import { IPrismaService } from '../../database/IPrismaService';
import { IUserRepository } from './interfaces/IUserRepository';
import { User } from './user.entity';

@injectable()
export class UserRepository implements IUserRepository {
  constructor(@inject(TYPES.PrismaService) private _prismaService: IPrismaService) {}

  async create({ name, email, password }: User): Promise<UserModel> {
    return this._prismaService.client.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  }

  async find(email: string): Promise<UserModel | null> {
    return this._prismaService.client.user.findFirst({
      where: {
        email,
      },
    });
  }
}
