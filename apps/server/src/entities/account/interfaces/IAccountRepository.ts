import { Account as AccountModel } from '@prisma/client';
import { Account } from '../account.entity';

import { AccountUpdateDto } from '../dto/account-update.dto';

export interface IAccountRepository {
  create: (account: Account) => Promise<AccountModel>;
  update: (id: number, account: AccountUpdateDto) => Promise<AccountModel>;
  delete: (id: number) => Promise<AccountModel | null>;
  findById: (id: number) => Promise<AccountModel | null>;
  find: (userId: number) => Promise<AccountModel[] | null>;
}
