import { IsOptional, IsString, IsNumber, Min } from 'class-validator';

export class CategoryCreateDto {
  @IsString({ message: 'Incorrect name' })
  name: string;

  @IsNumber({}, { message: 'Invalid limit' })
  @Min(0, { message: 'Limit must be a positive number' })
  limit: number;

  @IsOptional()
  @IsNumber({}, { message: 'Invalid user ID' })
  userId: number;
}
