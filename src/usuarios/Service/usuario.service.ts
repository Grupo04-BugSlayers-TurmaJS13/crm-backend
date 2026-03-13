import { HttpException, HttpStatus, Injectable, NotFoundException, UseGuards } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { CreateUsuarioDto } from "../dtos/create-usuario.dto";
import { UpdateUsuarioDto } from "../dtos/update-usuario.dto";
import { Usuario } from "../entities/usuario.entity";
import { Bcrypt } from "../../auth/bcrypt/bcrypt";

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private bcrypt: Bcrypt
  ) { }

  async cadastrar(createDto: CreateUsuarioDto): Promise<Usuario> {

    const buscaUsuario = await this.usuarioRepository.findOne({
      where: { usuario: createDto.usuario }
    });

    if (buscaUsuario)
      throw new HttpException(
        "O usuário já existe!",
        HttpStatus.BAD_REQUEST
      );

    createDto.senha = await this.bcrypt.criptografarSenha(createDto.senha);

    const usuario = this.usuarioRepository.create(createDto);

    return await this.usuarioRepository.save(usuario);
  }

  async atualizar(updateDto: UpdateUsuarioDto): Promise<Usuario> {
    if (!updateDto.id) {
      throw new NotFoundException('ID do usuário não informado');
    }

    const usuarioExistente = await this.usuarioRepository.findOne({
      where: { id: updateDto.id },
    });

    if (!usuarioExistente) {
      throw new NotFoundException(`Usuario com ID ${updateDto.id} não encontrado`);
    }

    // Criptografa a senha apenas se estiver sendo atualizada
    if (updateDto.senha) {
      updateDto.senha = await this.bcrypt.criptografarSenha(updateDto.senha);
    }

    Object.assign(usuarioExistente, updateDto);

    const usuarioAtualizado = await this.usuarioRepository.save(usuarioExistente);

    return usuarioAtualizado;
  }

  async listarUsuarios(): Promise<Usuario[]> {
    return this.usuarioRepository.find({
      relations: { oportunidades: true }
    });
  }

  async listarUsuariosId(id: number): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({
      where: { id },
      relations: { oportunidades: true }
    });
  }

  async listarPorNome(nome: string): Promise<Usuario[]> {
    return this.usuarioRepository.find({
      where: { nome: ILike(`%${nome}%`) },
      relations: { oportunidades: true }
    });
  }

  async buscarUsuario(usuario: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({
      where: { usuario },
      relations: { oportunidades: true }
    });
  }
}
