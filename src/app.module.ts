import { Module } from '@nestjs/common';
import { UsuariosModule } from './usuarios/usuario.module';


@Module({
  imports: [ UsuariosModule ],
  controllers: [],
  providers: [],
})
export class AppModule {}
