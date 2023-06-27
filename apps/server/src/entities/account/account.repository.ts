import { Account as AccountModel, Prisma } from '@prisma/client';
import { inject, injectable } from 'inversify';

import { TYPES } from '../../types';
import { IPrismaService } from '../../database/IPrismaService';
import { IAccountRepository } from './interfaces/IAccountRepository';
import { Account } from './account.entity';

@injectable()
export class AccountRepository implements IAccountRepository {
  constructor(@inject(TYPES.PrismaService) private _prismaService: IPrismaService) {}

  async create(accountData: Account): Promise<AccountModel> {
    return await this._prismaService.client.account.create({
      data: {
        name: accountData.name,
        description: accountData.description,
        balance: accountData.balance,
        type: accountData.type,
        userId: accountData.userId,
        currencyId: accountData.currencyId,
      },
    });
  }

  async update(accountId: number, accountData: Account): Promise<AccountModel> {
    return await this._prismaService.client.account.update({
      where: {
        id: accountId,
      },
      data: accountData,
    });
  }

  async delete(accountId: number): Promise<AccountModel | null> {
    return await this._prismaService.client.account.delete({
      where: {
        id: accountId,
      },
    });
  }

  async findById(accountId: number): Promise<AccountModel | null> {
    return await this._prismaService.client.account.findUniqueOrThrow({
      where: {
        id: accountId,
      },
    });
  }

  async find(userId: number): Promise<AccountModel[] | null> {
    return await this._prismaService.client.account.findMany({
      where: {
        userId: userId,
      },
    });
  }
}
