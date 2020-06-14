import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MiddlewareConfigProxy } from '@nestjs/common/interfaces';
import { CheckTokenMiddleware } from './middlewares';
import { CHECK_TOKEN_EXCEPTION } from './constants';

import { AuthController, AuthModule } from './modules/auth';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  private static useForUserRoutes(proxy: MiddlewareConfigProxy): MiddlewareConsumer {
    return proxy.exclude(...CHECK_TOKEN_EXCEPTION).forRoutes(AuthController);
  }

  public configure(consumer: MiddlewareConsumer): void {
    /**
     * THE ORDER OF APPLYING MIDDLEWARES IS IMPORTANT! PLEASE DO NOT CHANGE!
     */

    /**
     * Validate token and set parsed USER object on request
     */
    AppModule.useForUserRoutes(consumer.apply(CheckTokenMiddleware));
  }
}
