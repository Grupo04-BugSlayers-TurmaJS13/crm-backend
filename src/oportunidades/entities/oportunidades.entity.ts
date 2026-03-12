import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, IsPositive, IsNumber, IsEnum } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { StatusControle } from "../../util/statusControle";
import { NumericTransformer } from "../../util/numericTransform";
import { Cliente } from "../../cliente/entities/cliente.entity";
import { Usuario } from "../../usuarios/entities/usuario.entity";



@Entity({name: "tb_oportunidades"}) // create table tb_categorias
export class Oportunidade{
    
    @PrimaryGeneratedColumn() // PRIMARY KEY(id) AUTO_INCREMENT
    id: number;

    @Transform(({value } : TransformFnParams) => value?.trim()) // remover espaços em branco do inicio e fim
    @IsNotEmpty() // Força digitação
    @Column({length: 100, nullable: false}) // VARCHAR(100) NOT NULL
    servico: string;
    
    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty()
    @IsPositive()
    @Column({ type: "decimal", precision: 10, scale: 2, transformer: new NumericTransformer()})
    preco: number;

    @Transform(({value } : TransformFnParams) => value?.trim)
    @IsNotEmpty()
    @Column({type: "enum", enum: ["Aberto", "Fechado", "Perdido"]})
    status: StatusControle;

    @UpdateDateColumn() // Atualza a data na criação e na atualização
    data: Date;

    @ManyToOne(() => Cliente, (cliente) => cliente.oportunidades)
    cliente: Cliente

    @ManyToOne(() => Usuario, (usuario) => usuario.oportunidades)
    usuario: Usuario
}