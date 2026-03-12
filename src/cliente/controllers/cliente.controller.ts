import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ClienteService } from "../services/cliente.service";
import { Cliente } from "../entities/cliente.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller("/clientes")
export class ClienteController {

    constructor(private readonly clienteService: ClienteService) { }

    //lista tds os clientes
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Cliente[]> {
        return this.clienteService.findAll();
    }

    //lista cliente por id
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id') id: number): Promise<Cliente> {
        return this.clienteService.findById(id);
    }

    //lista cliente por nome
    @Get('/nome/:nome')
    @HttpCode(HttpStatus.OK)
    findByNome(@Param('nome') nome: string): Promise<Cliente[]> {
        return this.clienteService.findByNome(nome);
    }

    //cadastrar cliente
    @Post('/cadastrar')
    @HttpCode(HttpStatus.CREATED)
    create(@Body() cliente: Cliente): Promise<Cliente> {
        return this.clienteService.create(cliente);
    }

    //atualizar cliente
    @Put('/atualizar')
    @HttpCode(HttpStatus.OK)
    update(@Body() cliente: Cliente): Promise<Cliente> {
        return this.clienteService.update(cliente);
    }

    //deletar cliente
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.clienteService.delete(id);
    }

}