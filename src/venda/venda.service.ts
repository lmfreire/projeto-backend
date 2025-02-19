import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProdutoItemService } from 'src/produto-item/produto-item.service';
import { ProdutoService } from 'src/produto/produto.service';
import { VendaDto, VendaItemDto } from './venda.dto';

@Injectable()
export class VendaService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly produtoService: ProdutoService,
        private readonly produtoItemService: ProdutoItemService
    ){}

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

            const res = await this.produtoService.removerEstoque({
                empresaId: item.produtoItemId,
                produtoId: item.quantidade,
                quantidade: item.quantidade
            });

            if (!res) {
                throw new BadRequestException("Erro ao remover estoque");
            }

            total += item.valor_total;
        }

        await this.atualizarTotal(data.vendaId, total);

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
