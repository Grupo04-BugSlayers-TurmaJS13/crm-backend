import { Controller, Get, Post, Put, Body, Param, ParseIntPipe, Query, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateUsuarioDto } from '../dtos/createUsuario.dto';
import { UpdateUsuarioDto } from '../dtos/updateUsuario.dto';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { UsuarioService } from '../service/usuario.service';

@Controller('/usuarios')
export class UsuariosController {
  constructor(private readonly service: UsuarioService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  cadastrar(@Body() createDto: CreateUsuarioDto) {
    return this.service.cadastrar(createDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  atualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateUsuarioDto,
  ) {
    return this.service.atualizar(id, updateDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  listarUsuarios() {
    return this.service.listarUsuarios();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  listarUsuariosId(@Param('id', ParseIntPipe) id: number) {
    return this.service.listarUsuariosId(id);
  }
  
  @Get('/:nome')
  @HttpCode(HttpStatus.OK)
  listarPorNome(@Param('nome') nome: string) {
    return this.service.listarPorNome(nome);
  }
}
