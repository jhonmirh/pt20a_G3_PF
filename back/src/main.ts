import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfig = new DocumentBuilder()
    .setTitle("JhonDay")
    .setDescription("Este proyecto es una gestion de turnos de un negocio de servicios técnicos")
    .setVersion("1.0")
    // .addBearerAuth() TODAVIA NO TENEMOS AUTH
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup("api", app, document)

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type'], 
  });


  await app.listen(3010);
}
bootstrap();