import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import Heloworld from './configs/dbtest';
async function bootstrap() {
  const config = new DocumentBuilder()
    .setTitle('API for Employee mangement portal')
    .setDescription(
      'This documentation provides guidlines on CRUD operations for using Employee manager API.',
    )
    .setVersion('1.0')
    .build();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT || 8080);
  console.log('listening to nest app on port ' + process.env.PORT);
}
bootstrap();
