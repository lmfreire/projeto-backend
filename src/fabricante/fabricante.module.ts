import { Module } from '@nestjs/common';
import { FabricanteController } from './fabricante.controller';
import { FabricanteService } from './fabricante.service';

@Module({
  controllers: [FabricanteController],
  providers: [FabricanteService]
})
export class FabricanteModule {}
