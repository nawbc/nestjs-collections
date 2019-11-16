import { Injectable, Inject } from '@nestjs/common';
import { CONFIG_TOKEN } from './config.constants';
import { ConfigOptions } from './config-options.interface';
import { readFileSync } from 'fs';
import * as dotenv from 'dotenv';

@Injectable()
export class ConfigService {
  private readonly configs: object;
  constructor(
    @Inject(CONFIG_TOKEN) private readonly config: ConfigOptions = {},
  ) {
    const { env, according } = config;
    if (!!according) {
      for (const opt in according) {
        if (env === opt) {
          const content = readFileSync(according[opt]);
          this.configs = dotenv.parse(content);
        }
      }
    }
  }
  public get(val: string) {
    return this.configs[val];
  }
}
