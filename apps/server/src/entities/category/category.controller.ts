import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';

import { TYPES } from '../../types';
import { BaseController } from '../../common/base.controller';
import { IControllerRoute } from '../../common/interfaces/IControllerRoute';
import { ICategoryService } from './interfaces/ICategoryService';
import { ILoggerService } from '../../logger/ILoggerService';
import { IConfigService } from '../../config/IConfigService';

import { LoginMiddleware } from '../../common/middlewares/login.middleware';
import { ValidateMiddleware } from '../../common/middlewares/validate.middleware';
import { ValidateParamsMiddleware } from '../../common/middlewares/validate-params.middleware';
import { HttpError } from '../../errors/HttpError';

import { ICategoryController } from './interfaces/ICategoryController';
import { CategoryGetByIdDto } from './dto/category-get-by-id.dto';
import { CategoryUpdateDto } from './dto/category-update.dto';
import { CategoryCreateDto } from './dto/category-create.dto';

@injectable()
export class CategoryController extends BaseController implements ICategoryController {
  readonly routes: IControllerRoute[] = [
    {
      path: '/info',
      method: 'get',
      callback: this.info,
    },
    {
      path: '/create',
      method: 'post',
      callback: this.create,
      middlewares: [new ValidateMiddleware(CategoryCreateDto)],
    },
    {
      path: '/:id',
      method: 'put',
      callback: this.update,
      middlewares: [
        new ValidateMiddleware(CategoryUpdateDto),
        new ValidateParamsMiddleware(CategoryGetByIdDto),
      ],
    },
    {
      path: '/:id',
      method: 'delete',
      callback: this.delete,
      middlewares: [new ValidateParamsMiddleware(CategoryGetByIdDto)],
    },
    {
      path: '/:id',
      method: 'get',
      callback: this.getById,
      middlewares: [new ValidateParamsMiddleware(CategoryGetByIdDto)],
    },
  ];

  constructor(
    @inject(TYPES.ConfigService) private _configService: IConfigService,
    @inject(TYPES.Logger) private _logger: ILoggerService,
    @inject(TYPES.CategoryService) private _categoryService: ICategoryService,
  ) {
    super(_logger);

    const loginMiddleware = new LoginMiddleware(this._configService.getConfig<string>('SECRET'));

    this.routes = this.routes.map((route) => {
      return {
        ...route,
        middlewares: [...(route.middlewares || []), loginMiddleware],
      };
    });

    this.bindRoutes(this.routes);
  }

  public async create(
    req: Request<any, any, CategoryCreateDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = Number(req.userId);
      const body = req.body;
      body.userId = userId;
      const result = await this._categoryService.createCategory(body);
      this.success(res, result);
    } catch (error) {
      next(new HttpError(401, 'Category error', 'Create'));
    }
  }

  public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = Number(req.userId);
      const categoryId = Number(req.params.id);
      const categoryData = req.body;
      categoryData.userId = userId;
      const result = await this._categoryService.updateCategory(categoryId, categoryData);
      this.success(res, result);
    } catch (error) {
      next(new HttpError(500, 'Category error', 'Update'));
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = Number(req.userId);
      const categoryId = Number(req.params.id);
      const result = await this._categoryService.deleteCategory(categoryId, userId);
      this.success(res, result);
    } catch (error) {
      next(new HttpError(500, 'Category error', 'Delete'));
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = Number(req.userId);
      const categoryId = Number(req.params.id);
      const result = await this._categoryService.getCategoryById(categoryId, userId);
      this.success(res, result);
    } catch (error) {
      next(new HttpError(404, 'Category not found', 'Get'));
    }
  }

  public async info(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = Number(req.userId);
      const result = await this._categoryService.getCategories(userId);
      this.success(res, result);
    } catch (error) {
      next(new HttpError(404, 'Categories not found', 'Get'));
    }
  }
}
