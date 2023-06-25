import { IsOptional, IsString, IsNumber, Min, IsEnum } from 'class-validator';

export class AccountCreateDto {
  @IsString({ message: 'Incorrect name' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Incorrect description' })
  description: string;

  @IsNumber({}, { message: 'Invalid balance' })
  @Min(0, { message: 'Balance must be a positive number' })
  balance: number;

  @IsEnum(['WALLET', 'CARD'], { message: 'Invalid account type' })
  type: string;

  @IsNumber({}, { message: 'Invalid currency ID' })
  currencyId: number;

  @IsOptional()
  @IsNumber({}, { message: 'Invalid user ID' })
  userId: number;
}
