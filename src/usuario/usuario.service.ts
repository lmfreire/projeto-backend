import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUsuarioDto, LoginUsuarioDto } from './usuario-dto';

@Injectable()
export class UsuarioService {

    constructor(
        private readonly prismaService: PrismaService
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

        return result;
    }


}
