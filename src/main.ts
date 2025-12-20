import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const port = process.env.PORT ?? 3005;

  try {
    await app.listen(port);
    console.log(`\x1b[32m[Nest] Server is successfully listening on port ${port}\x1b[0m`);
  } catch (error) {
    if (error.code === 'EADDRINUSE') {
      console.error(`\x1b[31m[Nest] Error: Port ${port} is already in use. Please run 'taskkill /f /im node.exe' and try again.\x1b[0m`);
      process.exit(1);
    }
    throw error;
  }
}
bootstrap();
