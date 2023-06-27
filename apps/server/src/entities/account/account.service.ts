import { inject, injectable } from 'inversify';
import { Account as AccountModel, AccountType } from '@prisma/client';

import { TYPES } from '../../types';
import { IAccountService } from './interfaces/IAccountService';
import { IConfigService } from '../../config/IConfigService';
import { IAccountRepository } from './interfaces/IAccountRepository';

import { Account } from './account.entity';
import { AccountCreateDto } from './dto/account-create.dto';
import { AccountUpdateDto } from './dto/account-update.dto';

@injectable()
export class AccountService implements IAccountService {
  constructor(
    @inject(TYPES.ConfigService) private _configService: IConfigService,
    @inject(TYPES.AccountRepository) private _accountRepository: IAccountRepository,
  ) {}

  async createAccount({
    name,
    description,
    type,
    userId,
    balance,
    currencyId,
  }: AccountCreateDto): Promise<AccountModel | null> {
    const newAccount = new Account(
      name,
      description,
      balance,
      AccountType[type],
      userId,
      currencyId,
    );
    return this._accountRepository.create(newAccount);
  }

  async updateAccount(
    accountId: number,
    accountData: AccountUpdateDto,
  ): Promise<AccountModel | null> {
    const account = await this.find(accountId);
    if (account.userId != accountData.userId) {
      return null;
    }
    return this._accountRepository.update(accountId, accountData);
  }

  async deleteAccount(accountId: number, userId: number): Promise<AccountModel | null> {
    const account = await this.find(accountId);
    if (account.userId != userId) {
      return null;
    }
    return this._accountRepository.delete(accountId);
  }

  async getAccountById(accountId: number, userId: number): Promise<AccountModel | null> {
    const account = await this.find(accountId);
    if (account.userId != userId) {
      return null;
    }
    return account;
  }

  async getAccounts(userId: number): Promise<AccountModel[] | null> {
    return this._accountRepository.find(userId);
  }

  private async find(accountId: number): Promise<AccountModel | null> {
    return this._accountRepository.findById(accountId);
  }
}
