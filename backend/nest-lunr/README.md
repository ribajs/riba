# Nest Lunr

[Nest.js](https://nestjs.com/) module to use [Lunr.js](https://lunrjs.com/) in your in your Nest.js application.

## Install

```sh
npm / yarn install @ribajs/nest-lunr lunr @types/lunr
```

## Usage

app.module.ts

```ts
import { Module } from '@nestjs/common';
import { LunrModule, SearchController } from '@ribajs/nest-lunr';

// Your custom search service / controller
import { SearchService } from './api/search/search.service';
import { CustomSearchController } from './api/search/custom-search.controller';

@Module({
  imports: [
    LunrModule,
  ],
  controllers: [SearchController, CustomSearchController],
  providers: [SearchService],
})
export class AppModule {}

```

search.service.ts

```ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { GraphQLClient } from '@ribajs/node-graphql-client';
import { LunrService } from '@ribajs/nest-lunr';
import type { Builder } from 'lunr';
import type { PagesQuery, PagesQueryVariables} from './types';

@Injectable()
export class SearchService implements OnModuleInit {
  protected graphql = new GraphQLClient('cms.myproject.org/graphql');;

  constructor(readonly lunr: LunrService) {
    /**
     * Add language support
     * @see https://lunrjs.com/guides/language_support.html
     */
    require('lunr-languages/lunr.stemmer.support')(LunrService.lunr);
    require('lunr-languages/lunr.multi')(LunrService.lunr)
    require('lunr-languages/lunr.jp')(LunrService.lunr);
    require('lunr-languages/lunr.de')(LunrService.lunr);

    const pageFields: Array<keyof PagesQuery> = ['title', 'slug', 'text'];
    this.lunr.create('page', {
      fields: pageFields,
      plugins: [{ plugin: lunr.multiLanguage('en', 'jp', 'de'), args: [] }],
      metadataAllowList: ['position', 'index'],
    });
  }

  protected async loadPages() {
    let pages: PagesQuery = [];
    try {
      const result = await this.graphql.execute<PagesQuery>(
        'graphql/queries/pages',
      );
      pages = result || [];
    } catch (error) {
      console.error(error);
    }
    return pages;
  }

  public async refresh() {
    const pages = await this.loadPages();
    for (const page of pages) {
      this.lunr.add('page', page);
    }
    this.lunr.buildIndex('page');
  }

  onModuleInit() {
    this.refresh();
  }
}
```

## Api

### Controller

The Nest.js Lunr.js module has [a build in controller](./src/search.controller.ts), you can use it as a base for your own controller or just use the build in controller:

`/api/search/:namespace/:query`

Search in a specific namespace

- `@Get('/:namespace/:query')` - The url, e.g. `https://myproject.org/api/search/page/ゼルダ` which search for `ゼルダ` in your page namespace
- `@Param('namespace')` - The namespace you have defined in your `search.service.ts` with `this.searchPage = this.lunr.create('page')`
- `@Param('query')` - Your search query, e.g. `ゼルダ`

---

`/api/search/:query`

Search in a all existing namespaces

- `@Get('/:query')` - The url, e.g. `https://myproject.org/api/search/ゼル
- `@Param('query') query: string` - Your search query, e.g. `ゼルダ`

---

A custom search controller could look like this:

search.controller.ts

```ts
import { Controller, Get, Param, Res, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import {} from './types';
import { LunrService } from '@ribajs/nest-lunr';

@Controller('api/search')
export class SearchController {
  constructor(readonly lunr: LunrService) {}

  @Get('/:namespace/:query')
  search(
    @Res() res: Response,
    @Param('namespace') namespace: string,
    @Param('query') query: string,
  ) {
    const result = this.lunr.search(namespace, query);
    if (!result) {
      throw new NotFoundException(
        `[Lunr] No index namespace "${namespace}" found!`,
      );
    }
    return res.json(result);
  }

  @Get('/:query')
  searchAll(@Res() res: Response, @Param('query') query: string) {
    return res.json(this.lunr.searchAll(namespace, query));
  }
}
```
