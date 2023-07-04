export const TYPES = {
  Application: Symbol.for('Application'),

  /** Utils */
  ConfigService: Symbol.for('ConfigService'),
  Logger: Symbol.for('LoggerService '),
  PrismaService: Symbol.for('PrismaService'),
  ExceptionFilter: Symbol.for('ExceptionFilter'),

  /** Entities */
  UserService: Symbol.for('UserService'),
  UserController: Symbol.for('UserController'),
  UserRepository: Symbol.for('UserRepository'),
  AccountService: Symbol.for('AccountService'),
  AccountController: Symbol.for('AccountController'),
  AccountRepository: Symbol.for('AccountRepository'),
  CategoryService: Symbol.for('CategoryService'),
  CategoryController: Symbol.for('CategoryController'),
  CategoryRepository: Symbol.for('CategoryRepository'),
};
