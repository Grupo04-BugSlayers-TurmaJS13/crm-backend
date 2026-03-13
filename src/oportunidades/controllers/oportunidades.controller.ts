import { Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Body, Put, Delete, UseGuards } from "@nestjs/common";
import { OportunidadeService } from "../services/oportunidades.service";
import { Oportunidade } from "../entities/oportunidades.entity";
import { StatusControle } from "../../util/statusControle";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { Http2ServerRequest } from "http2";

@UseGuards(JwtAuthGuard)
@Controller("/oportunidades")
export class OportunidadeController{
    constructor(
        private readonly oportunidadeService: OportunidadeService
    ){}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Oportunidade[]>{
        return this.oportunidadeService.findAll();
    }

    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    findById(@Param("id", ParseIntPipe) id: number): Promise<Oportunidade>{
        return this.oportunidadeService.findByid(id);
    }

    @Get("/servico/:servico")
    @HttpCode(HttpStatus.OK)
    findAllByServico(@Param('servico') servico : string): Promise<Oportunidade[]> {
        return this.oportunidadeService.findAllByServico(servico);
    }
    
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() oportunidade: Oportunidade): Promise<Oportunidade>{
        return this.oportunidadeService.create(oportunidade);
    }

    @Put()
    @HttpCode(HttpStatus.CREATED)
    update(@Body() oportunidade: Oportunidade): Promise<Oportunidade>{
        return this.oportunidadeService.update(oportunidade);
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param("id", ParseIntPipe) id: number){
        return this.oportunidadeService.delete(id);
    }

    @Put("/atualizar-status")
    @HttpCode(HttpStatus.CREATED)
    updateStatus(@Body() data: { id: number; status: StatusControle }): Promise<Oportunidade>{
        const { id, status } = data;
        return this.oportunidadeService.updateStatus(id, status);
    }
}