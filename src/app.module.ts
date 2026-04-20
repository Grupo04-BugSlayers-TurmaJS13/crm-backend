import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ClienteModule } from './cliente/cliente.module';
import { OportunidadeModule } from './oportunidades/oportunidades.module';
import { UsuariosModule } from './usuarios/usuario.module';
import { ProdService } from './data/service/prod.service';
import { DevService } from './data/service/dev.service';

@Module({

  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRootAsync({
      useClass: ProdService,
      imports: [ConfigModule]
    }),
    ClienteModule,
    OportunidadeModule,
    UsuariosModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}