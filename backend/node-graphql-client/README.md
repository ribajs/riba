# Nest GraphQL Client

Lightweight GraphQL client for Node.js with automatic GraphQL document (query/mutation/subscription/fragment) loading.

## Install

```sh
npm / yarn install @ribajs/node-graphql-client
```

## Usage

```js
import { GraphQLClient } from '@ribajs/node-graphql-client';

const graphql = new GraphQLClient('strapi.myproject.org/graphql');

try {
  // Loads the GraphQL Document "pages.graphql" with the "slug" variable and executes the request
  const page = await graphql.execute<Page>('graphql/queries/pages', { slug: 'home'});
} catch (error) {
  console.error(error);
}
```
