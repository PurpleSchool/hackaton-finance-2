import { Account as AccountModel } from '@prisma/client';

import { AccountCreateDto } from '../dto/account-create.dto';
import { AccountUpdateDto } from '../dto/account-update.dto';

export interface IAccountService {
  createAccount: (dto: AccountCreateDto) => Promise<AccountModel | null>;
  updateAccount: (accountId: number, dto: AccountUpdateDto) => Promise<AccountModel | null>;
  deleteAccount: (accountId: number, userId: number) => Promise<AccountModel | null>;
  getAccountById: (accountId: number, userId: number) => Promise<AccountModel | null>;
  getAccounts: (userId: number) => Promise<AccountModel[] | null>;
}
