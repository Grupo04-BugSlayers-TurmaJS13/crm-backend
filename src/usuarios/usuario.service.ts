import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';


@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async cadastrar(createDto: CreateUsuarioDto): Promise<Usuario> {
    const usuario = this.usuarioRepository.create(createDto);

    if(!usuario)
      throw new HttpException("Erro ao criar usuário!", HttpStatus.BAD_REQUEST);


    return await this.usuarioRepository.save(usuario);
  }

  async atualizar(id: number, updateDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.usuarioRepository.preload({ id, ...updateDto });
    if (!usuario) {
      throw new NotFoundException(`Usuario com ID ${id} não encontrado`);
    }
    return await this.usuarioRepository.save(usuario);
  }

  async listarUsuarios(): Promise<Usuario[]> {
    return await this.usuarioRepository.find({ relations: ['oportunidades'] });
  }

  async listarUsuariosId(id: number): Promise<Usuario> {

    if(!id || id <= 0)
      throw new HttpException("ID inválido!", HttpStatus.BAD_REQUEST);

    const usuario = await this.usuarioRepository.findOne({
      where: { id },
      relations: ['oportunidades'],
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario com ID ${id} não encontrado`);
    }
    
    return usuario;
  }

  async listarPorNome(nome: string): Promise<Usuario[]> {
    return await this.usuarioRepository.find({
      where: { nome: Like(`%${nome}%`) },
      relations: ['oportunidades'],
    });
  }
  async autenticar(email: string, senha: string): Promise<Usuario | null> {
    const usuario = await this.usuarioRepository.findOne({ where: { email } });
    if (usuario && usuario.autenticar(email, senha)) {
      return usuario;
    }
    return null;
  }

  // async remover(id: number): Promise<void> {
  //   const result = await this.usuarioRepository.delete(id);
  //   if (result.affected === 0) {
  //     throw new NotFoundException(`Usuario com ID ${id} não encontrado`);
  //   }
  // }
}