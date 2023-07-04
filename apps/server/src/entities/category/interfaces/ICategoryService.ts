import { Category as CategorytModel } from '@prisma/client';

import { CategoryCreateDto } from '../dto/category-create.dto';
import { CategoryUpdateDto } from '../dto/category-update.dto';

export interface ICategoryService {
  createCategory: (dto: CategoryCreateDto) => Promise<CategorytModel | null>;
  updateCategory: (categoryId: number, dto: CategoryUpdateDto) => Promise<CategorytModel | null>;
  deleteCategory: (categoryId: number, userId: number) => Promise<CategorytModel | null>;
  getCategoryById: (categoryId: number, userId: number) => Promise<CategorytModel | null>;
  getCategories: (userId: number) => Promise<CategorytModel[] | null>;
}
