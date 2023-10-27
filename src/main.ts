import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Start the server
  await app.listen(8080);
  console.log('Application is running on: http://127.0.0.1:8080');
}

bootstrap().catch(console.error);
