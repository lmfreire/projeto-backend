import { BadRequestException, Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../usuario/auth.guard';
import { ProdutoItemService } from './produto-item.service';
import { BuscarProdutoItemDto, ProdutoItemDto } from './produto-item.dto';

@UseGuards(AuthGuard)
@Controller('produto_item')
export class ProdutoItemController {

    constructor(
        private readonly produtoItemService: ProdutoItemService,
    ){}

    @Post()
    async create(@Body() data: ProdutoItemDto) {

        try{ 
            return await this.produtoItemService.create(data);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Get(':empresaId/:produtoId')
    findAll(
        @Param('empresaId') empresaId: number,
        @Param('produtoId') produtoId: number,
    ){
        const data: BuscarProdutoItemDto = {
            produtoId,
            empresaId
        } 
        return this.produtoItemService.findAll(data);
    }
    @Get(':empresaId')
    findAllByEmpresa(
        @Param('empresaId') empresaId: number,
        @Param('produtoId') produtoId: number,
    ){
        const data: BuscarProdutoItemDto = {
            produtoId,
            empresaId
        } 
        return this.produtoItemService.findAllByEmpresa(data);
    }

}
