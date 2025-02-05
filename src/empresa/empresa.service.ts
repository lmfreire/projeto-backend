import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EmpresaService {

    constructor(
        private readonly prismaService: PrismaService,
    ){}

    async create(data: {nome: string, cnpj: string}){
        return this.prismaService.empresa.create({
            data: data,
        });
    }

    async findAll(){
        return await this.prismaService.empresa.findMany();
    }

    async findEmpresaByUser(user: any) {
        return await this.prismaService.empresa.findMany({
            where: {
                id: Number(user.empresaId)
            }
        });
    }

    

}
