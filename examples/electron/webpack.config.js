const path = require('path');
const rootPath = process.cwd();
const nodeExternals = require('webpack-node-externals');

// Renderer
const RibaWebpackConfig = require('@ribajs/webpack-config');
const ribaWebpackConfig = RibaWebpackConfig({
  template: 'local',
  target: 'electron-renderer',
  entry: {
    renderer: [
      path.resolve(rootPath, "src/scss/renderer.scss"),
      path.resolve(rootPath, "src/ts/renderer/renderer.ts"),
    ]
  },
  output: {
    path: path.resolve(rootPath, "dist/"),
    filename: "[name].bundle.js",
  }
});

// Main
const mainWebpackConfig = (env = {}) => {
  return {
    devtool: "inline-source-map",
    target: "electron-main",
    externals: [
      nodeExternals(),
    ],
    entry: {
      main: "./src/ts/main/main.ts",
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: "[name].bundle.js" 
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
      symlinks: true,
    },
    module: {
      rules: [
        { 
          test: /\.tsx?$/,
          loader: require.resolve("ts-loader"),
          options: {
            configFile: 'tsconfig.electron.json'
          }
        }
      ]
    }
  }
};

const preloadWebpackConfig = (env = {}) => {
  return {
    devtool: "inline-source-map",
    target: "electron-preload",
    externals: [
      nodeExternals(),
    ],
    entry: {
      preload: "./src/ts/preload/preload.ts",
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: "[name].bundle.js" 
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
      symlinks: true,
    },
    module: {
      rules: [
        { 
          test: /\.tsx?$/,
          loader: require.resolve("ts-loader"),
          options: {
            configFile: 'tsconfig.electron.json'
          }
        }
      ]
    }
  }
};


module.exports = [
  preloadWebpackConfig,
  ribaWebpackConfig,
  mainWebpackConfig,
];
