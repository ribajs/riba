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
    const results = this.lunr.search(namespace, query);
    if (!results) {
      throw new NotFoundException(
        `[Lunr] No index namespace "${namespace}" found!`,
      );
    }
    return res.json(results);
  }

  /**
   * E.g. /lunr/search/ゼルダ
   */
  @Get('/search/:query')
  searchAll(@Res() res: Response, @Param('query') query: string) {
    const result = this.lunr.searchAll(query);
    return res.json(result);
  }
}
