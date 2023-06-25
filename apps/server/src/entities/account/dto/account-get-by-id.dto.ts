import { IsInt, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class AccountGetByIdDto {
  @Transform(({ value }) => Number(value))
  @IsInt({ message: 'Account ID must be an integer' })
  @Min(1, { message: 'Account ID must be greater than or equal to 1' })
  id: number;
}
