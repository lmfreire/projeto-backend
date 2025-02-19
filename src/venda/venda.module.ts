import { Module } from '@nestjs/common';
import { VendaController } from './venda.controller';
import { VendaService } from './venda.service';
import { ProdutoModule } from 'src/produto/produto.module';
import { ProdutoItemModule } from 'src/produto-item/produto-item.module';

@Module({
  imports: [ProdutoModule, ProdutoItemModule],
  controllers: [VendaController],
  providers: [VendaService]
})
export class VendaModule {}
