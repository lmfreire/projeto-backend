import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './cliente-dto';

@Controller('cliente')
export class ClienteController {

    constructor(
        private readonly clienteService: ClienteService,
    ){}

    @Post()
    async create(@Body() createClienteDto: CreateClienteDto) {
        return this.clienteService.createCliente(createClienteDto);
    }

    @Get(':empresaId')
    async findAll(@Param('empresaId') empresaId: number) {
        return this.clienteService.findAll(empresaId);
    }

    @Get(':empresaId/:cpf')
    findOne(
        @Param('empresaId') empresaId: number,
        @Param('cpf') cpf: string,
    ){       
        return this.clienteService.findOne(empresaId, cpf);
    }
}
