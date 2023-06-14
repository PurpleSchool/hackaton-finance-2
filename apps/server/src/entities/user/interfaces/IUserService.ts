import { User as UserModel } from '@prisma/client';

import { UserLoginDto } from '../dto/user-login.dto';
import { UserRegisterDto } from '../dto/user-register.dto';

export interface IUserService {
  createUser: (dto: UserRegisterDto) => Promise<UserModel | null>;
  loginUser: (dto: UserLoginDto) => Promise<boolean>;
  getUserInfo: (email: string) => Promise<Omit<UserModel, 'password'> | null>;
}
