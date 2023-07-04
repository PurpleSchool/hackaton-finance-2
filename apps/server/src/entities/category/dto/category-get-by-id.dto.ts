import { IsInt, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class CategoryGetByIdDto {
  @Transform(({ value }) => Number(value))
  @IsInt({ message: 'Category ID must be an integer' })
  @Min(1, { message: 'Category ID must be greater than or equal to 1' })
  id: number;
}
