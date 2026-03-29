import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    credentials: true,
  });
  const port = Number(process.env.PORT) || 3001;
  // Required in Docker so the server accepts connections from outside the container.
  await app.listen(port, '0.0.0.0');
}
bootstrap();
