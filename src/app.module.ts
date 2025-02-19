import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { EmpresaModule } from './empresa/empresa.module';
import { UsuarioModule } from './usuario/usuario.module';
import { FabricanteModule } from './fabricante/fabricante.module';
import { ProdutoModule } from './produto/produto.module';
import { ProdutoItemModule } from './produto-item/produto-item.module';
import { ClienteModule } from './cliente/cliente.module';
import { VendaModule } from './venda/venda.module';

@Module({
  imports: [PrismaModule, EmpresaModule, UsuarioModule, FabricanteModule, ProdutoModule, ProdutoItemModule, ClienteModule, VendaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
