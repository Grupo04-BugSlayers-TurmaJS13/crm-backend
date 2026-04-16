import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('Conecta CRM')
  .setDescription('Projeto Conecta CRM')
  .setContact("BugSlayers","https://github.com/BugSlayers-tjs13","grupo.04.turma.javascript.13@gmail.com")
  .setVersion('1.0')
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

//para validar biblioteca
app.useGlobalPipes(new ValidationPipe());

//para aceitar requisições de outros domínios
  app.enableCors();
  
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
