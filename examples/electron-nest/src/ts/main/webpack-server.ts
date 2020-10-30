/* eslint-disable @typescript-eslint/no-var-requires */
import * as webpack from "webpack";
import * as WDS from "webpack-dev-server";
import * as WebpackConfig from "../../../webpack.renderer.js";

export const webpackServer = async () => {
  const webpackConfig = await WebpackConfig(ENV);
  // console.debug(webpackConfig);

  WDS.addDevServerEntrypoints(
    webpackConfig,
    webpackConfig.devServer,
    undefined
  );

  const compiler = webpack(webpackConfig as any);
  const devServer = new WDS(compiler, webpackConfig.devServer);

  return devServer;
};
