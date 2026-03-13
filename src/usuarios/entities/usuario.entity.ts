import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Oportunidade } from '../../oportunidades/entities/oportunidades.entity';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

@Entity('tb_usuarios')
export class Usuario {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @IsNotEmpty()
    @Length(3, 60, { message: "O nome deve conter no mínimo 3 caracteres" })
    @Column()
    nome: string;

    @IsEmail()
    @IsNotEmpty()
    @Column({ length: 255, name: 'usuario' })
    usuario: string;

    @IsNotEmpty()
    @Length(8, 60, { message: "A senha deve conter no mínimo 8 caracteres" })
    @Column({ nullable: false })
    senha: string;

    @Column({ length: 500, nullable: true })
    foto: string;

    @OneToMany(() => Oportunidade, (oportunidade) => oportunidade.usuario)
    oportunidades: Oportunidade[];

    autenticar(usuario: string, senha: string): boolean {
        return this.usuario === usuario && this.senha === senha;
    }
}