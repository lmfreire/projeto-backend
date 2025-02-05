import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { AuthGuard } from '../usuario/auth.guard';

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

    @UseGuards(AuthGuard)
    @Get('/usuario')
    async findEmpresaByUser(@Req() req: Request) {
        const user = req['user'];
        return await this.empresaService.findEmpresaByUser(user);
    }

}
