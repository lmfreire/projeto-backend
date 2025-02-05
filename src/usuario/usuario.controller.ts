import { BadRequestException, Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto, LoginUsuarioDto } from './usuario-dto';

@Controller('usuario')
export class UsuarioController {

    constructor(
        private readonly usuarioService: UsuarioService,
    ){}

    @Post()
    async create(@Body() createUsuarioDto: CreateUsuarioDto) {
        return this.usuarioService.createUsuario(createUsuarioDto);
    }

    @Get(':empresaId')
    async findAll(@Param('empresaId') empresaId: number) {
        return this.usuarioService.findAll(empresaId);
    }

    @Post('login')
    async login(@Body() loginUsuarioDto: LoginUsuarioDto) {
        try {
            return await this.usuarioService.login(loginUsuarioDto);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Get('/empresa/:email')
    async findEmpresaByUserEmail(@Param('email') email: string) {
        
        try {
            return await this.usuarioService.findEmpresaByUserEmail(email);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
        
    }
}
