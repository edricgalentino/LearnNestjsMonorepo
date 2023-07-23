import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Edric Learn NestJS API')
    .setDescription('This is the API for Edric Learn NestJS')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .setVersion('0.0.1')
    .addTag('auth')
    .addTag('users')
    .addTag('products')
    .addTag('notifications')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
      },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();
