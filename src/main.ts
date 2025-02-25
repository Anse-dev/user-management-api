import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Validation globale
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  
  // Configuration de Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Gestion des Utilisateurs')
    .setDescription('API pour créer, lire, mettre à jour et supprimer des utilisateurs')
    .setVersion('1.0')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  // Activation CORS
  app.enableCors();
  
  await app.listen(process.env.APP_PORT || 3000);
}
bootstrap();
