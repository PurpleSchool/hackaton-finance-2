import { inject, injectable } from 'inversify';

import { IConfigService } from './IConfigService';
import { ILoggerService } from '../logger/ILoggerService';
import { TYPES } from '../types';

@injectable()
export class ConfigService implements IConfigService {
  #config: string | number;

  constructor(@inject(TYPES.Logger) private _logger: ILoggerService) {}

  getConfig<T extends string | number>(key: string): T {
    try {
      this.#config = process.env[key] as T;
      this._logger.log(`[ConfigService]: Config field ${key} is loaded`);
    } catch {
      this._logger.error('[ConfigService]: Error while reading of .env file');
    }

    return this.#config as T;
  }
}
