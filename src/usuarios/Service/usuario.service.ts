import { Injectable, NotFoundException, UseGuards } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { CreateUsuarioDto } from "../dtos/create-usuario.dto";
import { UpdateUsuarioDto } from "../dtos/update-usuario.dto";
import { Usuario } from "../entities/usuario.entity";

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) { }

  async cadastrar(createDto: CreateUsuarioDto): Promise<Usuario> {
    const usuario = this.usuarioRepository.create(createDto);
    return this.usuarioRepository.save(usuario);
  }

  async atualizar(id: number, updateDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuarioExistente = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuarioExistente) {
      throw new NotFoundException(`Usuario com ID ${id} não encontrado`);
    }
    Object.assign(usuarioExistente, updateDto);
    return this.usuarioRepository.save(usuarioExistente);
  }

  async listarUsuarios(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async listarUsuariosId(id: number): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({ where: { id } });
  }

  async listarPorNome(nome: string): Promise<Usuario[]> {
    return this.usuarioRepository.find({
      where: { nome: ILike(`%${nome}%`) },
    });
  }

  async buscarUsuario(usuario: string): Promise<Usuario | null> {
    return await this.usuarioRepository.findOne({
      where: { usuario }
    });
  }
}
