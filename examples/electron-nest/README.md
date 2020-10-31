# Riba.js + Electron.js + Nest.js + Webpack 5 + Hot Module Replacement (client and server side)

This example shows how you can use Riba.js in the renderer process, Nest.js in the main process and how you can build both with Webpack 5 and HMR support on the client/renderer and the server/main process.

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

## How it works

### Webpack

Normally it is recommended to use the [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) + [webpack-hot-middleware](https://github.com/webpack-contrib/webpack-hot-middleware), but we use the [webpack-dev-server](https://github.com/webpack/webpack-dev-server) together with Nest.js. This has the advantage that all plugins and loaders defined in the webpack config work out of the box.

## Why Nest.js

Nest.js is very modular, for example you can easy replace express with fastify without the need to modify your source code significantly. You can also use Nest.js completely without any http server, so it is perfect for Electron.js apps if you want to use TypeScript and a well structured architecture.

## Why a http server

* For security reasons, an http server between the main process and the renderer process forces a strict separation, you can also disable the remote support, both increases the security.
* There are many useful libraries and tools for http servers that you can use
* Support of HMR
* If you later want to turn your Electron.js app into a web application without Elektron (or vice versa), then you can easily reuse much of the code.

If you do not want to use a http server you can remove it and use somesing like e[electron-router](https://github.com/geblanco/electron-router) in your controllers instead.

## See also

* [dorp.io/posts/webpack-express-hmr](https://dorp.io/posts/webpack-express-hmr/) Tutorial to learn how you can use HMR with Express.js
