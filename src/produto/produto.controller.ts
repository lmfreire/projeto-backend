import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { AuthGuard } from '../usuario/auth.guard';
import { findAllByFabricanteDto, findById, ProdutoDto } from './produto-dto';

@UseGuards(AuthGuard)
@Controller('produto')
export class ProdutoController {

    constructor(
        private readonly produtoService: ProdutoService,
    ){}

    @Post()
    create(@Body() data: ProdutoDto){
        return this.produtoService.create(data);
    }

    @Get(':empresaId')
    findAll(
        @Param('empresaId') empresaId: number,
        @Query('page') page: number = 1, 
        @Query('limit') limit: number = 10
    ){
        return this.produtoService.findAllWithPagination(empresaId, page, limit);
    }

    @Get('fabricante/:empresaId/:fabricanteId')
    findAllByFabricante(
        @Param('empresaId') empresaId: number,
        @Param('fabricanteId') fabricanteId: number,
    ){
        const data: findAllByFabricanteDto = {
            fabricanteId,
            empresaId
        } 
        return this.produtoService.findAllByFabricante(data);
    }

    @Get(':empresaId/:id')
    findById(
        @Param('empresaId') empresaId: number,
        @Param('id') id: number,
    ){
        const data: findById = {
            empresaId,
            id
        } 
        return this.produtoService.findById(data);
    }


}
