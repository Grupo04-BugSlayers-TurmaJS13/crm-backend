import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosController } from './controller/usuarios.controller';
import { UsuariosService } from './service/usuario.service';
import { Usuario } from './entities/usuario.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario]), forwardRef(() => AuthModule)],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService],  
})
export class UsuariosModule {}