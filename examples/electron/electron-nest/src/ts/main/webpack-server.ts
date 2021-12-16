/* eslint-disable @typescript-eslint/no-var-requires */
import * as webpack from "webpack";
import * as WDS from "webpack-dev-server";
import * as WebpackConfig from "../../../webpack.renderer.js";

export const webpackServer = async (port: number) => {
  const webpackConfig = await WebpackConfig(ENV);

  webpackConfig.devServer.port = port;

  WDS.addDevServerEntrypoints(
    webpackConfig,
    webpackConfig.devServer,
    undefined
  );

  const compiler = webpack(webpackConfig as any);
  const devServer = new WDS(compiler, webpackConfig.devServer);

  return devServer;
};
