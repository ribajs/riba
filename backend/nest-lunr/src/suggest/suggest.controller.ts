import { Controller, Get, Res, Param } from '@nestjs/common';
import { Response } from 'express';
import { SuggestService } from './suggest.service';
import { SuggestResult, SuggestResultExt } from './types';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('suggestions')
@Controller('api/suggest')
export class SuggestController {
  constructor(readonly suggest: SuggestService) { }

  /**
   * Get suggestions for all namespaces
   *
   * @param {Response} res
   * @param {string} word
   * @returns
   * @memberof SearchController
   */
  @Get('/:namespace/:word')
  async suggestion(
    @Res() res: Response,
    @Param('namespace') namespace: string,
    @Param('word') word: string,
  ) {
    let result: SuggestResult[];
    try {
      result = this.suggest.suggest(namespace, word);
    } catch (error) {
      throw error;
    }
    return res.json(result);
  }

  /**
   * Get suggestions from all namespaces
   *
   * @param {Response} res
   * @param {string} word
   * @returns
   * @memberof SearchController
   */
  @Get('/:word')
  async allSuggestions(@Res() res: Response, @Param('word') word: string) {
    let result: SuggestResultExt[];
    try {
      result = this.suggest.suggestAll(word);
    } catch (error) {
      throw error;
    }
    return res.json(result);
  }
}
