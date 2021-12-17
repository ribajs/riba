import { Injectable } from '@nestjs/common';

@Injectable()
export class PageService {
  // TODO list pages from database or headless cms
  list() {
    return [];
  }
  // TODO get page by slug from database or headless cms
  get(slug: string) {
    return {
      meta: {
        title: 'Default Theme - Any Page',
      },
      page: {
        slug,
        title: 'Any Page',
        content: 'Hello world from page!',
      },
      router: {
        namespace: 'page-' + slug,
      },
    };
  }
}
