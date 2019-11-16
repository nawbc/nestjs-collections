import {
  Module,
  Inject,
  Injectable,
  DynamicModule,
  Options,
  Controller,
  Get,
} from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { ConfigModule } from './lib/ config/config.module';
import { resolve } from 'path';
// import { ConfigService } from './lib/ config/config.service';
// import { CONFIG_TOKEN } from './lib/ config/config.constants';

@Injectable()
class DemoService {
  // constructor(@Inject('demo') private readonly config: any) {
  //   console.log(config);
  // }
}

@Injectable()
class TryService {
  fuckClass() {
    console.log('fuck class');
  }
}

@Module({
  providers: [
    {
      provide: 'demo',
      useValue: { fuck: 'fuck' },
    },
    TryService,
  ],
  exports: [TryService],
})
class TryModule {}

// @Module({})
// class DemoModule {
//   static forRoot(configs: any): DynamicModule {
//     console.log(configs);
//     return {
//       module: DemoModule,
//       imports: configs.imports || [],
//       providers: [
//         {
//           provide: 'demo',
//           useFactory: async () => {
//             return 'a';
//           },
//           inject: ['config'],
//         },
//         {
//           provide: 'config',
//           useFactory: async options => {
//             return options;
//           },
//           inject: configs.inject || [],
//         },
//         DemoService,
//       ],
//       exports: [DemoService],
//     };
//   }
// }

@Injectable()
export class AppService {
  constructor(@Inject('demo') private readonly a) {}
  getHello(): string {
    return 'Hello World!';
  }
}

@Controller()
class AppController {
  constructor(private readonly app: AppService) {}
  @Get()
  async index() {
    console.log(this.app);
  }
}

@Module({
  imports: [TryModule],
  controllers: [AppController],
  providers: [AppService, TryService],
})
export class AppModule {}
