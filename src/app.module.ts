import { Module } from '@nestjs/common';
<<<<<<< HEAD
<<<<<<< HEAD
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './cliente/entities/cliente.entity';
import { ClienteModule } from './cliente/cliente.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_conecta_crm',
      entities: [Cliente],
      synchronize: true,
      }),
      ClienteModule
  ],
=======
=======
import { TypeOrmModule } from '@nestjs/typeorm';
import { OportunidadeModule } from './oportunidades/oportunidades.module';
import { Usuario } from './usuarios/entities/usuario.entity';
import { Oportunidade } from './oportunidades/entities/oportunidades.entity';
>>>>>>> aa2ab680befe782d2b15e677b1ab357cb190dc0b
import { UsuariosModule } from './usuarios/usuario.module';
import { Cliente } from './cliente/entities/cliente.entity';
import { ClienteModule } from './cliente/cliente.module';

@Module({
<<<<<<< HEAD
  imports: [ UsuariosModule ],
>>>>>>> b521252fb5200a03ee79d7d3fc5e5e619b76946e
=======
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
>>>>>>> aa2ab680befe782d2b15e677b1ab357cb190dc0b
  controllers: [],
  providers: [],
})
export class AppModule {}