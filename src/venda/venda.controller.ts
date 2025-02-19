import { Body, Controller, Post } from '@nestjs/common';
import { VendaService } from './venda.service';
import { VendaDto, VendaItemDto } from './venda.dto';

@Controller('venda')
export class VendaController {
    
    constructor(
        private readonly vendaService: VendaService
    ){}

    @Post()
    async create(@Body() data: VendaDto) {        
        return this.vendaService.create(data);
    }

    @Post("/item")
    async createItem(@Body() data: VendaItemDto) {        
        return this.vendaService.adicionarItens(data);
    }
}
