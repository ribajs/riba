import { Injectable } from '@nestjs/common';

@Injectable()
export class IndexService {
  // TODO get home data from database or headless cms
  get() {
    return {
      meta: {
        title: 'Default Theme - Home',
      },
      index: {
        title: 'Home',
        content: 'Hello world from home!',
      },
      router: {
        namespace: 'index',
      },
    };
  }
}
