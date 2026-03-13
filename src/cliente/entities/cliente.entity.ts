import { Transform, TransformFnParams } from "class-transformer"
import { IsEmail, IsNotEmpty } from "class-validator"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Oportunidade } from "../../oportunidades/entities/oportunidades.entity"


@Entity({name: 'tb_clientes'})

export class Cliente {
    @PrimaryGeneratedColumn() 
    id: number

    @Transform(({ value } : TransformFnParams) => value?.trim()) 
    @IsNotEmpty()
    @Column({length: 255, nullable: false}) 
    nome: string

    @Transform(({ value } : TransformFnParams) => value?.trim()) 
    @IsEmail()
    @IsNotEmpty()
    @Column({length: 255, nullable: false}) 
    email: string

    @Transform(({ value } : TransformFnParams) => value?.trim()) 
    @IsNotEmpty()
    @Column({length: 20, nullable: false}) 
    telefone: string

    @Transform(({ value } : TransformFnParams) => value?.trim()) 
    @Column({length: 500}) 
    sites: string

    @OneToMany(() => Oportunidade, (oportunidade) => oportunidade.cliente)
    oportunidades: Oportunidade[]

}