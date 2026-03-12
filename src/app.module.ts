import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ClienteModule } from './cliente/cliente.module';
import { OportunidadeModule } from './oportunidades/oportunidades.module';
import { Cliente } from './cliente/entities/cliente.entity';
import { Oportunidade } from './oportunidades/entities/oportunidades.entity';
import { Usuario } from './usuarios/entities/usuario.entity';
import { UsuariosModule } from './usuarios/usuario.module';

@Module({

  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get("DB_HOST"),
        port: configService.get('DB_PORT'),
        username: configService.get("DB_USERNAME"),
        password: configService.get("DB_PASSWORD"),
        database: configService.get("DB_DATABASE"),
        entities: [Cliente, Oportunidade, Usuario],
        synchronize: true,
        logging: true,
      }),
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