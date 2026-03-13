import { Controller, Get, Post, Put, Body, Param, ParseIntPipe, Query, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateUsuarioDto } from '../dtos/create-usuario.dto';
import { UpdateUsuarioDto } from '../dtos/update-usuario.dto';
import { UsuariosService } from '../service/usuario.service';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { Usuario } from '../entities/usuario.entity';

@Controller('/usuarios')
export class UsuariosController {
  constructor(private readonly service: UsuariosService) { }

  @Post('/cadastrar')
  @HttpCode(HttpStatus.CREATED)
  async cadastrar(@Body() createDto: CreateUsuarioDto) {
    return this.service.cadastrar(createDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/atualizar')
  @HttpCode(HttpStatus.OK)
  async atualizar(@Body() updateDto: UpdateUsuarioDto): Promise<Usuario> {
    return this.service.atualizar(updateDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async listarUsuarios() {
    return this.service.listarUsuarios();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async listarUsuariosId(@Param('id', ParseIntPipe) id: number) {
    return this.service.listarUsuariosId(id);
  }

  @Get('/nome/:nome')
  @HttpCode(HttpStatus.OK)
  async listarPorNome(@Param('nome') nome: string) {
    return this.service.listarPorNome(nome);
  }
}
