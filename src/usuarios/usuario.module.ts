import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosController } from './Controller/usuarios.controller';
import { Usuario } from './entities/usuario.entity';
import { UsuariosService } from './Service/usuario.service';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService],  
})
export class UsuariosModule {}