import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Oportunidade } from '../../oportunidades/entities/oportunidades.entity';

@Entity('usuarios')
export class Usuario {
    @PrimaryGeneratedColumn({ type: 'bigint'})
    id: number;

    @Column({ length: 255})
    nome: string;

    @Column({ length: 255})
    email: string;

    @Column({ length: 255, name: 'usuario' })
    usuario: string;

    @Column({ length: 20})
    senha: string;

    @Column({ length: 500, nullable: true})
    foto: string;

    @OneToMany(() => Oportunidade, (oportunidade) => oportunidade.usuario)
    oportunidades: Oportunidade[];

    autenticar(email: string, senha: string): boolean {
        return this.email === email && this.senha === senha;
    }
}