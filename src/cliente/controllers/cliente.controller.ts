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
    async findAll(): Promise<Cliente[]> {
        return await this.clienteService.findAll();
    }

    //lista cliente por id
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    async findById(@Param('id') id: number): Promise<Cliente> {
        return await this.clienteService.findById(id);
    }

    //lista cliente por nome
    @Get('/nome/:nome')
    @HttpCode(HttpStatus.OK)
    async findByNome(@Param('nome') nome: string): Promise<Cliente[]> {
        return await this.clienteService.findByNome(nome);
    }

    //cadastrar cliente
    @Post('/cadastrar')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() cliente: Cliente): Promise<Cliente> {
        return await this.clienteService.create(cliente);
    }

    //atualizar cliente
    @Put('/atualizar')
    @HttpCode(HttpStatus.OK)
    async update(@Body() cliente: Cliente): Promise<Cliente> {
        return await this.clienteService.update(cliente);
    }

    //deletar cliente
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.clienteService.delete(id);
    }
}