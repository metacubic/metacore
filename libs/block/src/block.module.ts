import { Module } from '@nestjs/common';
import { BlockService } from './block.service';

@Module({
  providers: [BlockService],
  exports: [BlockService],
})
export class BlockModule {}
