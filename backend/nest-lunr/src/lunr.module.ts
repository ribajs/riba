import { Module } from '@nestjs/common';
import { LunrService } from './lunr.service';

@Module({
  providers: [LunrService],
  controllers: [],
  exports: [LunrService],
})
export class LunrModule {}
