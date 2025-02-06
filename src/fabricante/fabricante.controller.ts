import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FabricanteService } from './fabricante.service';
import { CriarFabricanteDto } from './fabricante-dto';

@Controller('fabricante')
export class FabricanteController {

    constructor(
        private readonly fabricanteService: FabricanteService,
    ){}

    @Get(':empresaId')
    async findAllByEmpresa(@Param('empresaId') empresaId: number){
        return this.fabricanteService.findAllByEmpresa(empresaId);
    }

    @Post()
    async create(@Body() data: CriarFabricanteDto){
        return this.fabricanteService.create(data);
    }
}
