import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OportunidadeModule } from './oportunidades/oportunidades.module';
import { Usuario } from './usuarios/entities/usuario.entity';
import { Oportunidade } from './oportunidades/entities/oportunidades.entity';
import { UsuariosModule } from './usuarios/usuario.module';
import { Cliente } from './cliente/entities/cliente.entity';
import { ClienteModule } from './cliente/cliente.module';

@Module({
  imports: [
TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '', 
  database: 'db_conecta_crm',
}),
    UsuariosModule,
    OportunidadeModule,
    ClienteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}