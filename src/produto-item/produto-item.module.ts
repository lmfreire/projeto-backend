import { Module } from '@nestjs/common';
import { ProdutoItemController } from './produto-item.controller';
import { ProdutoItemService } from './produto-item.service';
import { ProdutoModule } from '../produto/produto.module';

@Module({
  imports: [ProdutoModule],
  controllers: [ProdutoItemController],
  providers: [ProdutoItemService]
})
export class ProdutoItemModule {}
