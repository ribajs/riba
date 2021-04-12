import { Module } from '@nestjs/common';
import { LunrService } from './lunr.service';
import { SuggestService } from './suggest/suggest.service';

@Module({
  providers: [LunrService, SuggestService],
  controllers: [],
  exports: [LunrService],
})
export class LunrModule {}
