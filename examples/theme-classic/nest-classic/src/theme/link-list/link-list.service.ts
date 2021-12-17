import { Injectable } from '@nestjs/common';

/**
 * Get link lists / navigations (e.g. from db or headless cms)
 */
@Injectable()
export class LinkListService {
  /**
   * List all available navigations
   */
  list() {
    return {
      main: this.get('main'),
    };
  }
  /**
   * Get navigation data by slug
   * @param slug
   */
  get(slug: string) {
    return {
      slug,
      items: [
        {
          label: 'Home',
          url: '/', // Or reference to page or something like this
        },
        {
          label: 'About',
          url: '/pages/about',
        },
      ],
    };
  }
}
