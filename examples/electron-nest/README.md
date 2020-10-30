# Riba.js + Electron.js + Nest.js + Webpack 5 + Hot Module Replacement (client and server side)

This example shows how you can use Riba.js in the renderer process, Nest.js in the main process and how you can build both with Webpack 5 with HMR support on the client/renderer and the server/main process.

## Build

We are using `yarn` 2 in Riba.js if we can, but for the reason that electron is currectly not working with Pnp support we need to use `npm`:

```bash
npm install
npm run build
```

## Run in production mode

```bash
npm run build && npm run start
```

## Run in development mode (with HMR support)

```bash
npm run watch
```

## See also

* [dorp.io/posts/webpack-express-hmr](https://dorp.io/posts/webpack-express-hmr/) Tutorial to learn how you can use HMR with Express.js
