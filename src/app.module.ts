import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './cliente/entities/cliente.entity';
import { ClienteModule } from './cliente/cliente.module';
import { Oportunidade } from './oportunidades/entities/oportunidades.entity';

import { OportunidadeModule } from './oportunidades/oportunidades.module';

import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { Usuario } from './usuario/entities/usuario.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1306',
      database: 'db_conecta_crm',
      entities: [Cliente, Oportunidade, Usuario],
      synchronize: true,
      }),
      ClienteModule,
      OportunidadeModule,
      UsuarioModule,
      AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
