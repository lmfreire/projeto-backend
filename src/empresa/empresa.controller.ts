import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmpresaService } from './empresa.service';

@Controller('empresa')
export class EmpresaController {

    constructor(
        private readonly empresaService: EmpresaService,
    ){}

    @Post()
    async create(@Body() data: {nome: string; cnpj: string}) {
        return await this.empresaService.create(data);
    }

    @Get()
    async findAll() {
        return await this.empresaService.findAll();
    }

}
