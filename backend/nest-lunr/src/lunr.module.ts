import { Module } from '@nestjs/common';
import { LunrService } from './lunr.service';
import { LunrController } from './lunr.controller';

@Module({
  providers: [LunrService],
  controllers: [LunrController],
  exports: [LunrService],
})
export class LunrModule {}
