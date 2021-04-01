import { Controller, Get, Param, Res, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { LunrService } from './lunr.service';

/**
 * E.g. /lunr/search/page/ゼルダ
 */
@Controller('lunr')
export class LunrController {
  constructor(readonly lunr: LunrService) {}

  @Get('/search/:namespace/:query')
  search(
    @Res() res: Response,
    @Param('namespace') namespace: string,
    @Param('query') query: string,
  ) {
    const index = this.lunr.getIndex(namespace);
    if (!index) {
      throw new NotFoundException(
        `[Lunr] No index namespace "${namespace}" found!`,
      );
    }

    const result = index.search(query);
    return res.json(result);
  }
}
