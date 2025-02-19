import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClienteDto } from './cliente-dto';

@Injectable()
export class ClienteService {

    constructor(
        private readonly prismaService: PrismaService,
    ){}

    async createCliente(data: CreateClienteDto){
        return this.prismaService.cliente.create({
            data: {
                empresaId: Number(data.empresaId),
                ...data
            }
        });
    }

    async findAll(empresaId: number){
        return await this.prismaService.cliente.findMany({
            where: {
                empresaId: Number(empresaId)
            }
        })
    }

    async findOne(empresaId: number, cpf: string){
        return await this.prismaService.cliente.findFirst({
            where: {
                cpf: cpf,
                empresaId: Number(empresaId)
            }
        })
    }
}
