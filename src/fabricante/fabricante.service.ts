import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CriarFabricanteDto } from './fabricante-dto';

@Injectable()
export class FabricanteService {

    constructor(
        private readonly prismaService: PrismaService
    ){}

    async create(data: CriarFabricanteDto){
        return this.prismaService.fabricante.create({
            data: {
                empresaId: Number(data.empresaId),
                nome: data.nome,
            },
        });
    }

    async findAllByEmpresa(empresaId: number){
        return await this.prismaService.fabricante.findMany({
            where: {
                empresaId: Number(empresaId)
            },
            include: {
                empresa: true,
            },
        });
    }
}
