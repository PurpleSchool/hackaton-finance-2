import { Category as CategoryModel } from '@prisma/client';
import { Category } from '../category.entity';

import { CategoryUpdateDto } from '../dto/category-update.dto';

export interface ICategoryRepository {
  create: (category: Category) => Promise<CategoryModel>;
  update: (id: number, category: CategoryUpdateDto) => Promise<CategoryModel>;
  delete: (id: number) => Promise<CategoryModel | null>;
  findById: (id: number) => Promise<CategoryModel | null>;
  find: (categoryId: number) => Promise<CategoryModel[] | null>;
}
