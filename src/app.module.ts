import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './cliente/entities/cliente.entity';
import { ClienteModule } from './cliente/cliente.module';
import { Oportunidade } from './oportunidades/entities/oportunidades.entity';
import { Usuario } from './usuarios/entities/usuario.entity';
import { OportunidadeModule } from './oportunidades/oportunidades.module';
import { UsuariosModule } from './usuarios/usuario.module';


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
      UsuariosModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
