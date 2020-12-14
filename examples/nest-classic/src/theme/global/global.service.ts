import { Injectable } from '@nestjs/common';
import { LinkListService } from '../link-list/link-list.service';

/**
 * Get global template variables (e.g. from db or headless cms)
 */
@Injectable()
export class GlobalService {
  constructor(protected linkList: LinkListService) {}
  /**
   * Get global settings usable in all templates
   */
  get() {
    return {
      linkList: this.linkList.list(),
    };
  }
}
