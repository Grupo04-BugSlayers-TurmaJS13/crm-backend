import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateUsuarioDto } from '../dtos/create-usuario.dto';
import { UpdateUsuarioDto } from '../dtos/update-usuario.dto';
import { UsuariosService } from '../service/usuario.service';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly service: UsuariosService) { }

  // UML: +cadastrar() : post
  @Post()
  @HttpCode(HttpStatus.CREATED)
  cadastrar(@Body() createDto: CreateUsuarioDto) {
    return this.service.cadastrar(createDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
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

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  listarUsuariosId(@Param('id', ParseIntPipe) id: number) {
    return this.service.listarUsuariosId(id);
  }

  @Get('por-nome')
  @HttpCode(HttpStatus.OK)
  listarPorNome(@Query('nome') nome: string) {
    return this.service.listarPorNome(nome);
  }
}
