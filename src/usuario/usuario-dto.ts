export class LoginUsuarioDto {
    email: string;
    empresaId: number;
    senha: string
}

export class CreateUsuarioDto extends LoginUsuarioDto {
    nome: string;
}
