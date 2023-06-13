import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';

import { ILoggerService } from '../logger/ILoggerService';
import { IPrismaService } from './IPrismaService';
import { TYPES } from '../types';

@injectable()
export class PrismaService implements IPrismaService {
  client: PrismaClient;

  constructor(@inject(TYPES.Logger) private _logger: ILoggerService) {
    this.client = new PrismaClient();
  }

  async connect(): Promise<void> {
    try {
      await this.client.$connect();
      this._logger.log(`[PrismaService] Successfully connected to database`);
    } catch (e) {
      if (e instanceof Error) {
        this._logger.error(`[PrismaService] Error while connection to database` + e.message);
      }
    }
  }

  async disconnect(): Promise<void> {
    await this.client.$disconnect();
    this._logger.log(`[PrismaService] Successfully disconnected from database`);
  }
}
