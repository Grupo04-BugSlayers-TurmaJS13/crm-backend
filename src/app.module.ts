import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { OportunidadeModule } from './oportunidades/oportunidades.module';
import { ClienteModule } from './clientes/clientes.module';  
import { Usuario } from './usuarios/entities/usuario.entity';
import { Oportunidade } from './oportunidades/entities/oportunidades.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1306',
      database: 'db_conecta_crm',
      entities: [Usuario, Oportunidade /*, Cliente */],
      synchronize: true,
    }),
    UsuariosModule,
    OportunidadeModule,
    ClienteModule,  // adicionado
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}