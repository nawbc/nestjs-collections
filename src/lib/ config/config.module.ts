import { Module, DynamicModule, Injectable } from '@nestjs/common';
import { ConfigService } from './config.service';
import { CONFIG_TOKEN } from './config.constants';
import { ConfigOptions } from './config-options.interface';

@Module({})
export class ConfigModule {
  static register(options: ConfigOptions): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: CONFIG_TOKEN,
          useValue: options,
        },
        ConfigService,
      ],
      exports: [ConfigService],
    };
  }
  static registerAsync(options: ConfigOptions): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: CONFIG_TOKEN,
          useFactory: async opt => {
            return options;
          },
        },
        ConfigService,
      ],
      exports: [ConfigService],
    };
  }
}
