import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Like, DeleteResult, LessThan, MoreThan } from "typeorm";
import { Oportunidade } from "../entities/oportunidades.entity";
import { StatusControle } from "../../util/statusControle";




@Injectable()
export class OportunidadeService{

    constructor(
        @InjectRepository(Oportunidade)
        private oportunidadeRepository : Repository<Oportunidade>,

    ){}

    async findAll():  Promise<Oportunidade[]>{
        // SELECT * FROM tb_oportunidades;
        return this.oportunidadeRepository.find({
            relations:{
                cliente: true,
                usuario: true
            }
        });
    }

    
    async findByid(id: number): Promise<Oportunidade>{
        // SELECT * FROM tb_oportunidades where id = ? ;
        const oportunidade = await this.oportunidadeRepository.findOne({
            where:{
                id
            },
            relations:{
                cliente: true,
                usuario: true
            }
        })

        if(!oportunidade)
            throw new HttpException("Oportunidade não encontrada!", HttpStatus.NOT_FOUND);

        return oportunidade;
    }

    
    
    async create(oportunidade: Oportunidade): Promise<Oportunidade>{

        
        this.verificarStatusValido(oportunidade.status);
        //INSERT INTO tb_oportunidades (nome, texto) VALUES(?, ?);
        return await this.oportunidadeRepository.save(oportunidade);
    }

    async update(oportunidade: Oportunidade): Promise<Oportunidade>{
        
        if(!oportunidade.id || oportunidade.id <= 0)
            throw new HttpException("O ID da oportunidade é inválido!", HttpStatus.BAD_REQUEST);

        //Checa se a Oportunidade existe
        await this.findByid(oportunidade.id);

        this.verificarStatusValido(oportunidade.status);

        //UPDATE tb_oportunidades SET nome = ?, texto = ?, data = CURRENT_TIMESTAMP() WHERE id = ?;
        return await this.oportunidadeRepository.save(oportunidade);
    }

    async delete(id: number): Promise<DeleteResult>{
        
        await this.findByid(id);

        //DELETE tb_oportunidades FROM  ID = ?;
        return await this.oportunidadeRepository.delete(id);
    }

    async updateStatus(id: number, status: StatusControle): Promise<Oportunidade>{
        
         if(!id || id <= 0)
            throw new HttpException("O ID da oportunidade é inválido!", HttpStatus.BAD_REQUEST);


        const oportunidade = await this.findByid(id);

        this.verificarStatusValido(status);
        
        oportunidade.status = status;

        return await this.oportunidadeRepository.save(oportunidade);

}

    verificarStatusValido(status: string): void{
        const statusValidos = ["Aberto", "Fechado", "Perdido"];
        if(!statusValidos.includes(status)){
            throw new HttpException("Status da oportunidade é inválido! Deve ser 'Aberto', 'Fechado' ou 'Perdido'", HttpStatus.BAD_REQUEST);
        }
        
    }
}