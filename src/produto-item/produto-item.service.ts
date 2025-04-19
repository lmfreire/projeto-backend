import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BuscarProdutoItemDto, ProdutoItemDto } from './produto-item.dto';
import { ProdutoService } from '../produto/produto.service';

@Injectable()
export class ProdutoItemService {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly produtoService: ProdutoService
    ){}

    async create(data: ProdutoItemDto){
        const produtoItem = await this.prismaService.produtoItem.create({
            data: data,
        });

        if (!produtoItem) {
            throw new Error("Erro ao criar o produto item");
        }

        try {
            
            await this.produtoService.adicionarEstoque({
                empresaId: data.empresaId,
                produtoId: data.produtoId,
            });

            return produtoItem;

        } catch (error) {
            throw new Error(error.message);
        }
    }

    async findAll(data: BuscarProdutoItemDto){
        return await this.prismaService.produtoItem.findMany({
            where: {
                empresaId: Number(data.empresaId),
                produtoId: Number(data.produtoId)
            },
            include: {
                produto: true
            }
        })
    }

    
    async findAllByEmpresa(data: BuscarProdutoItemDto){
        return await this.prismaService.produtoItem.findMany({
            where: {
                empresaId: Number(data.empresaId),
                vendaItem: {
                    NOT: null
                }
            },
            include: {
                produto: true
            }
        })
    }
}
