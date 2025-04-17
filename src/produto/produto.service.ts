import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { adicionarEstoqueDto, findAllByFabricanteDto, findById, ProdutoDto, removerEstoqueDto } from './produto-dto';

@Injectable()
export class ProdutoService {

    constructor(
        private readonly prismaService: PrismaService
    ){}

    async create(data: ProdutoDto){
        return this.prismaService.produto.create({
            data: {
                estoque: 0,
                ...data
            },
        });
    }
    
    async findAll(empresaId: number) {
        return this.prismaService.produto.findMany({
            where: {
                empresaId: Number(empresaId)
            }
        });
    }

    async findAllWithPagination(empresaId: number, page: number, limit: number) {
        const pageNumber = Number(page);
        const limitNumber = Number(limit);

        const skip = (pageNumber - 1) * limitNumber; 
    
        const [produtos, total] = await Promise.all([
            this.prismaService.produto.findMany({
                where: {
                    empresaId: Number(empresaId),
                },
                skip: skip,
                take: limitNumber,
            }),
            this.prismaService.produto.count({
                where: {
                    empresaId: Number(empresaId),
                },
            }),
        ]);
    
        return {
            total,
            pageNumber,
            limitNumber,
            data: produtos,
        };
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
                empresaId: Number(data.empresaId),
                id: Number(data.id)
            },
            include: {
                ProdutoItem: true
            }
        });
    }

    async adicionarEstoque(data: adicionarEstoqueDto){

        const estoque = await this.prismaService.produto.findUnique({
            where: {
                id: Number(data.produtoId),
                empresaId: Number(data.empresaId)
            }
        })

        if (!estoque) {
            throw new Error('Produto não encontrado');
        }

        return this.prismaService.produto.update({
            where: {
                id: Number(data.produtoId),
                empresaId: Number(data.empresaId)
            },
            data: {
                estoque: estoque.estoque + 1
            }
        });
    }

    async removerEstoque(data: removerEstoqueDto){

        const estoque = await this.prismaService.produto.findUnique({
            where: {
                id: Number(data.produtoId),
                empresaId: Number(data.empresaId)
            }
        })

        if (!estoque) {
            throw new Error('Produto não encontrado');
        }

        return this.prismaService.produto.update({
            where: {
                id: Number(data.produtoId),
                empresaId: Number(data.empresaId)
            },
            data: {
                estoque: estoque.estoque - data.quantidade
            }
        });
    }
}
