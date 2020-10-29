/* eslint-disable @typescript-eslint/no-var-requires */
import * as webpack from "webpack";
import * as WDS from "webpack-dev-server";
import * as WebpackConfig from "../../../webpack.renderer.js";

export const hmrServer = async () => {
  const webpackConfig = await WebpackConfig(ENV);
  // console.debug(webpackConfig);

  WDS.addDevServerEntrypoints(
    webpackConfig,
    webpackConfig.devServer,
    undefined
  );

  const compiler = webpack(webpackConfig as any);
  const devServer = new WDS(compiler, webpackConfig.devServer);

  devServer.listen(
    webpackConfig.devServer.port,
    webpackConfig.devServer.host,
    (/*err: Error*/) => {
      // noop
    }
  );

  console.log(
    `HMR listening on http://${webpackConfig.devServer.host}:${webpackConfig.devServer.port}\n`
  );

  return devServer;
};
