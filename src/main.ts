import {
  CustomException,
  ErrorMessages,
} from './common/exceptions/custom.exception';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, ValidationError, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaService } from './database/prisma.service';
import { sessionMiddleware } from './middlewares/session.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Global prefix
  app.setGlobalPrefix('/api/v1');

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const modifiedErrors: ErrorMessages = {};
        errors.forEach((error) => {
          modifiedErrors[error.property] = Object.values(error.constraints)[0];
        });
        return new CustomException(modifiedErrors, HttpStatus.BAD_REQUEST);
      },
    }),
  );

  // Cors
  app.enableCors({
    origin: 'http://localhost:4200', //! to be changed with real host
    credentials: true,
  });

  // Swagger docs
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Cardinal')
    .setDescription('Documentation for the Cardinal API')
    .setVersion('1.0')
    .addTag('sentences')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  // Session
  app.use(sessionMiddleware(app.get(PrismaService)));

  await app.listen(configService.get('PORT'));
}
bootstrap();
