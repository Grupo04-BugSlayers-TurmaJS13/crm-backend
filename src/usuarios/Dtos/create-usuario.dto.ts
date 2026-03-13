import { IsNotEmpty, IsEmail, Length, IsOptional } from "class-validator";
export class CreateUsuarioDto {
    @IsNotEmpty ()
    @Length(3, 255, {message: "O nome deve conter no mínimo 3 caracteres"})
    nome: string;

    @IsEmail()
    @IsNotEmpty()
    usuario: string;

    @IsNotEmpty()
    @Length(8, 60, {message: "A senha deve conter no mínimo 8 caracteres"})
    senha: string;

    @IsOptional()
    foto?: string;
}