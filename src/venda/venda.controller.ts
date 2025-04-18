import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { VendaService } from './venda.service';
import { VendaDto, VendaDtoService, VendaItemDto, VendaItemFindById, VendaItemRemoveDto } from './venda.dto';
import { AuthGuard } from '../usuario/auth.guard';

@UseGuards(AuthGuard)
@Controller('venda')
export class VendaController {
    
    constructor(
        private readonly vendaService: VendaService
    ){}

    @Get("/:empresaId")
    async findAllByEmpresa(@Param('empresaId') empresaId: number) {
        return this.vendaService.findAllByEmpresa(empresaId);
    }

    @Get('/:empresaId/:vendaId')
    findAllById(
        @Param('empresaId') empresaId: number,
        @Param('vendaId') vendaItemId: number,
    ){ 
        const data: VendaItemFindById = {
            empresaId,
            vendaItemId
        } 
        return this.vendaService.findById(data);
    }
    

    @Post()
    async create(@Req() req: Request, @Body() data: VendaDto) {  
        const dt: VendaDtoService = {
            ...data,
            usuarioId: req['user'].id,
        } 
        return this.vendaService.create(dt);
    }

    @Post("/item")
    async createItem(@Body() data: VendaItemDto) {        
        return this.vendaService.adicionarItens(data);
    }

    @Post("/item/remove")
    async removeItem(@Body() data: VendaItemRemoveDto) {        
        return this.vendaService.removerItem(data);
    }
}
