import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { findAllByFabricanteDto, findById, ProdutoDto } from './produto-dto';

@Injectable()
export class ProdutoService {

    constructor(
        private readonly prismaService: PrismaService
    ){}

    async create(data: ProdutoDto){
        return this.prismaService.produto.create({
            data: data,
        });
    }
    
    async findAll(empresaId: number) {
        return this.prismaService.produto.findMany({
            where: {
                empresaId: Number(empresaId)
            }
        });
    }

    async findAllByFabricante(data: findAllByFabricanteDto) {
        return this.prismaService.produto.findMany({
            where: {
                fabricanteId: Number(data.fabricanteId),
                empresaId: Number(data.empresaId)
            }
        });
    }

    async findById(data: findById) {
        return this.prismaService.produto.findUnique({
            where: {
                fabricanteId: Number(data.fabricanteId),
                empresaId: Number(data.empresaId),
                id: Number(data.id)
            }
        });
    }
}
