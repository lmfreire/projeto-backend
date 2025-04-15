import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProdutoItemService } from 'src/produto-item/produto-item.service';
import { ProdutoService } from 'src/produto/produto.service';
import { VendaDto, VendaItemDto, VendaItemFindById, VendaItemRemoveDto } from './venda.dto';

@Injectable()
export class VendaService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly produtoService: ProdutoService,
        private readonly produtoItemService: ProdutoItemService
    ){}

    async findAllByEmpresa(empresaId: number) {
        return await this.prismaService.venda.findMany({
            where: {
                empresaId: Number(empresaId)
            },
            include: {
                usuario: true,
                cliente: true,
                VendaItem: {
                    include: {
                        produtoItem: {
                            include: {
                                produto: true
                            }
                        }
                    }
                }
            }
        });
    }

    async findById(data: VendaItemFindById) {
        return await this.prismaService.venda.findFirst({
            where: {
                id: Number(data.vendaItemId),
                empresaId: Number(data.empresaId)
            },
            include: {
                usuario: true,
                empresa: true,
                cliente: true,
                VendaItem: true
            }
        });
    }

    async create(data: VendaDto){
        return await this.prismaService.venda.create({
            data: {
                valor_total: data.valor_total,
                descricao: data.descricao,
                usuarioId: data.usuarioId,
                empresaId: data.empresaId,
                clienteId: data.clienteId                
            },
        })
    }

    async adicionarItens(data: VendaItemDto){
        const venda = await this.prismaService.venda.findUnique({
            where: {
                id: data.vendaId
            }
        });

        if (!venda) {
            throw new BadRequestException("Venda não encontrada");
        }

        let total = 0;
        for (const item of data.itens) {
            const itemv = await this.prismaService.vendaItem.create({
                data: {
                    produtoItemId: item.produtoItemId,
                    quantidade: item.quantidade,
                    valor_unitario: item.valor_unitario,
                    valor_total: item.valor_total,
                    desconto: item.desconto,
                    vendaId: data.vendaId
                }
            });

            if (!itemv) {
                throw new BadRequestException("Erro ao adicionar item");
            }

            const produtoItem = await this.prismaService.produtoItem.findFirst({
                where: {
                    id: item.produtoItemId,
                    empresaId: data.empresaId
                }
            })

            const res = await this.produtoService.removerEstoque({
                empresaId: data.empresaId,
                produtoId: produtoItem.produtoId,
                quantidade: item.quantidade
            });

            if (!res) {
                throw new BadRequestException("Erro ao remover estoque");
            }

            total += item.valor_total;
        }

        await this.atualizarTotal(data.vendaId, total);

    } 
    
    async removerItem(data: VendaItemRemoveDto){
        const item = await this.prismaService.vendaItem.findUnique({
            where: {
                id: data.vendaItemId,                
            }
        });

        if (!item) {
            throw new BadRequestException("Item não encontrado");
        }

        const produtoItem = await this.prismaService.produtoItem.findFirst({
            where: {
                id: item.produtoItemId,
                empresaId: data.empresaId
            }
        })

        const res = await this.produtoService.adicionarEstoque({
            empresaId: data.empresaId,
            produtoId: produtoItem.produtoId,
        });

        if (!res) {
            throw new BadRequestException("Erro ao adicionar estoque");
        }

        return await this.prismaService.vendaItem.delete({
            where: {
                id: data.vendaItemId
            }

        });
    }
    
    async atualizarTotal(vendaId: number, total: number){
        return await this.prismaService.venda.update({
            where: {
                id: vendaId
            },
            data: {
                valor_total: total
            }
        });        
    }
}
