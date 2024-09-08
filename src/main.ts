import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { port } from './utils/constants/port.constant';
import { swagger } from './configs/swagger-configs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  swagger(app);

  await app.listen(port);
}
bootstrap();
