import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUsuarioDto, LoginUsuarioDto } from './usuario-dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsuarioService {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService
    ){}

    async createUsuario(data: CreateUsuarioDto){

        data.senha = await bcrypt.hash(data.senha, 10);

        return this.prismaService.usuario.create({
            data: {
                empresaId: Number(data.empresaId),
                ...data
            }
        });
    }

    async findAll(empresaId: number){
        return await this.prismaService.usuario.findMany({
            where: {
                empresaId: Number(empresaId)
            },
            include: {
                empresa: true
            }
        })
    }

    async login(data: LoginUsuarioDto) {
        const result = await this.prismaService.usuario.findUnique({
            where:{
                empresaId: Number(data.empresaId),
                email: data.email
            }
        });

        if(!result){
            throw new Error('Credenciais inválidas');
        }

        const senhaCorreta = await bcrypt.compare(data.senha, result.senha);

        if (!senhaCorreta) {
            throw new Error('Credenciais inválidas');
        }

        const {senha, ...result_limpo} = result

        return {
            access_token: this.jwtService.sign(result)
        }
    }

    async findEmpresaByUserEmail(email: string) {
        const usuario = await this.prismaService.usuario.findUnique({
            where: {
                email
            }
        })

        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }

        return await this.prismaService.empresa.findMany({
            where: {
                id: Number(usuario.empresaId)
            }
        });
    }


}
