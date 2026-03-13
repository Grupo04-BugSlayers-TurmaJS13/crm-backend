import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Cliente } from "../entities/cliente.entity";
import { InjectRepository } from "@nestjs/typeorm/dist/common/typeorm.decorators";
import { DeleteResult, ILike, Repository } from "typeorm";


@Injectable()
export class ClienteService {
    constructor(
        @InjectRepository(Cliente)
        private clienteRepository: Repository<Cliente>,
    ){}

    //lista tds os clientes
    async findAll(): Promise<Cliente[]> {
        return await this.clienteRepository.find({
            relations: { oportunidades: true }
        });
    }

    //lista cliente por id
    async findById(id: number): Promise<Cliente> {

        const cliente = await this.clienteRepository.findOne({
            where: { id },
            relations: { oportunidades: true }
        });

        if (!cliente)
            throw new HttpException('Cliente não encontrado!', HttpStatus.NOT_FOUND);
        return cliente;
    }

    //lista cliente por nome
    async findByNome(nome: string): Promise<Cliente[]> {
        return await this.clienteRepository.find({
            where: {
                nome: ILike(`%${nome}%`) //select * from tb_produtos where nome like '%nome%'
            },
            relations: { oportunidades: true }
        });
    }

    //cadastrar cliente
    async create(cliente: Cliente): Promise<Cliente> {
        return await this.clienteRepository.save(cliente);
    }

    //atualizar cliente
    async update(cliente: Cliente): Promise<Cliente> {
        let buscaCliente = await this.findById(cliente.id); //verificar se o produto existe no banco de dados
        if (!buscaCliente) 
            throw new HttpException(`Cliente com id ${cliente.id} não encontrado`, HttpStatus.NOT_FOUND); //lançar um erro caso o produto não seja encontrado
        
        await this.findById(cliente.id); //checa se o produto existe
    
        return await this.clienteRepository.save(cliente);
    }

    //deletar cliente
    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id); //verificar se o produto existe no banco de dados
        return await this.clienteRepository.delete(id);
    }
}