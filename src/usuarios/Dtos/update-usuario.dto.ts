import { CreateUsuarioDto } from './create-usuario.dto';

export class UpdateUsuarioDto extends CreateUsuarioDto {
  id: number; // necessário para identificar qual usuário atualizar
}