import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, Query } from '@nestjs/common';
import { CreateUsuarioDto } from '../Dtos/create-usuario.dto';
import { UpdateUsuarioDto } from '../Dtos/update-usuario.dto';
import { UsuariosService } from '../Service/usuario.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly service: UsuariosService) {}

  @Post()
  cadastrar(@Body() createDto: CreateUsuarioDto) {
    return this.service.cadastrar(createDto);
  }

  @Put(':id')
  atualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateUsuarioDto,
  ) {
    return this.service.atualizar(id, updateDto);
  }

  @Get()
  listarUsuarios() {
    return this.service.listarUsuarios();
  }

  @Get(':id')
  listarUsuariosId(@Param('id', ParseIntPipe) id: number) {
    return this.service.listarUsuariosId(id);
  }

  @Get('por-nome')
  listarPorNome(@Query('nome') nome: string) {
    return this.service.listarPorNome(nome);
  }

  @Post('autenticar')
  autenticar(
    @Body() body: { email: string; senha: string },
  ) {
    return this.service.autenticar(body.email, body.senha);
  }
}