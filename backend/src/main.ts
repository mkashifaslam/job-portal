import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.FRONTEND_URL || `http://localhost:${process.env.FRONTEND_PORT || 5173}`,
    credentials: true,
  });
  await app.listen(process.env.BACKEND_PORT || process.env.PORT || 3000);
}
bootstrap();
