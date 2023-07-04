import { Category as CategoryModel, Prisma } from '@prisma/client';
import { inject, injectable } from 'inversify';

import { TYPES } from '../../types';
import { IPrismaService } from '../../database/IPrismaService';
import { ICategoryRepository } from './interfaces/ICategoryRepository';
import { Category } from './category.entity';

@injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(@inject(TYPES.PrismaService) private _prismaService: IPrismaService) {}

  async create(categoryData: Category): Promise<CategoryModel> {
    return await this._prismaService.client.category.create({
      data: {
        name: categoryData.name,
        limit: categoryData.limit,
        userId: categoryData.userId,
      },
    });
  }

  async update(categoryId: number, categoryData: Category): Promise<CategoryModel> {
    return await this._prismaService.client.category.update({
      where: {
        id: categoryId,
      },
      data: categoryData,
    });
  }

  async delete(categoryId: number): Promise<CategoryModel | null> {
    return await this._prismaService.client.category.delete({
      where: {
        id: categoryId,
      },
    });
  }

  async findById(categoryId: number): Promise<CategoryModel | null> {
    return await this._prismaService.client.category.findUniqueOrThrow({
      where: {
        id: categoryId,
      },
    });
  }

  async find(userId: number): Promise<CategoryModel[] | null> {
    return await this._prismaService.client.category.findMany({
      where: {
        userId: userId,
      },
    });
  }
}
