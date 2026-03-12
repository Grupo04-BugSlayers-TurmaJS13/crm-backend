import { Module } from '@nestjs/common';
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
import { UsuariosModule } from './usuarios/usuario.module';


@Module({
  imports: [ UsuariosModule ],
>>>>>>> b521252fb5200a03ee79d7d3fc5e5e619b76946e
  controllers: [],
  providers: [],
})
export class AppModule {}
