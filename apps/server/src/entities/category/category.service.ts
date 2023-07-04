import { inject, injectable } from 'inversify';
import { Category as CategoryModel } from '@prisma/client';

import { TYPES } from '../../types';
import { IConfigService } from '../../config/IConfigService';

import { Category } from './category.entity';
import { CategoryCreateDto } from './dto/category-create.dto';
import { CategoryUpdateDto } from './dto/category-update.dto';
import { ICategoryService } from './interfaces/ICategoryService';
import { ICategoryRepository } from './interfaces/ICategoryRepository';

@injectable()
export class CategoryService implements ICategoryService {
  constructor(
    @inject(TYPES.ConfigService) private _configService: IConfigService,
    @inject(TYPES.CategoryRepository) private _categoryRepository: ICategoryRepository,
  ) {}

  async createCategory({ name, limit, userId }: CategoryCreateDto): Promise<CategoryModel | null> {
    const newCategory = new Category(name, limit, userId);
    return this._categoryRepository.create(newCategory);
  }

  async updateCategory(
    categoryId: number,
    categoryData: CategoryUpdateDto,
  ): Promise<CategoryModel | null> {
    const category = await this.find(categoryId);
    if (category.userId != categoryData.userId) {
      return null;
    }
    return this._categoryRepository.update(categoryId, categoryData);
  }

  async deleteCategory(categoryId: number, userId: number): Promise<CategoryModel | null> {
    const category = await this.find(categoryId);
    if (category.userId != userId) {
      return null;
    }
    return this._categoryRepository.delete(categoryId);
  }

  async getCategoryById(categoryId: number, userId: number): Promise<CategoryModel | null> {
    const category = await this.find(categoryId);
    if (category.userId != userId) {
      return null;
    }
    return category;
  }

  async getCategories(userId: number): Promise<CategoryModel[] | null> {
    return this._categoryRepository.find(userId);
  }

  private async find(categoryId: number): Promise<CategoryModel | null> {
    return this._categoryRepository.findById(categoryId);
  }
}
