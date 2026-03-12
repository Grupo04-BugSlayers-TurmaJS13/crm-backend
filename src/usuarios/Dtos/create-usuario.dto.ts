import { IsNotEmpty, IsEmail, Length, IsOptional } from "class-validator";
export class CreateUsuarioDto {
    @IsNotEmpty ()
    @Length(3, 255)
    nome: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @Length(3, 255)
    usuario: string;

    @IsNotEmpty()
    @Length(6, 20)
    senha: string;

    @IsOptional()
    foto?: string;
}