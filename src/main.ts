import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as compress from 'compression';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const fastifyAdapter = new FastifyAdapter({
    http2: false,
    logger: true,
  });
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, fastifyAdapter, {
    bodyParser: true,
    cors: true,
  });

  app
    .setGlobalPrefix('api')
    .use(compress({}))
    .use(cookieParser());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Betslip_be')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  // @ts-ignore
  SwaggerModule.setup('/swagger', app, document);
  await app.init();
  await app.listen(4013, '0.0.0.0');
}

bootstrap()
  .then(() => {
    console.info('Server started, check the route http://localhost:4013/swagger');
  })
  .catch(err => {
    console.log(err);
    console.log('gor error on application start: ', JSON.stringify(err));
    process.exit(1);
  });
process.on('unhandledRejection', err => {
  console.log('got unhandledRejection :', err);
  process.exit(1);
});
process.on('uncaughtException', error => {
  console.log('got uncaughtException: ', error);
  process.exit(1);
});
