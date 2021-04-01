import {
  Controller,
  Get,
  Param,
  // Query,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import {} from './types';
import { LunrService } from './lunr.service';
// import { Query as LunrQuery } from 'lunr';

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
    console.debug('lunr namespace', namespace);
    console.debug('lunr query', query);
    // console.debug('lunr field', field);
    const index = this.lunr.getIndex(namespace);
    // console.debug('lunr search index', index);
    if (!index) {
      throw new NotFoundException(
        `[Lunr] No index namespace "${namespace}" found!`,
      );
    }

    const result = index.search(query);
    console.debug('lunr result', result);
    return res.json(result);
  }
}
