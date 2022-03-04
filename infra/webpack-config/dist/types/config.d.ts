import type { DefinePlugin } from "webpack";
import type TerserPlugin from "terser-webpack-plugin";
import type WebpackbarPlugin from "terser-webpack-plugin";
import type ForkTsCheckerPlugin from "fork-ts-checker-webpack-plugin";
import type CssExtractPlugin from "mini-css-extract-plugin";
import type HtmlWebpackPlugin from "html-webpack-plugin";
import type NodeExternalsPlugin from "webpack-node-externals";
import { ConfigStyle, LoaderItem } from ".";
export interface Config {
    styles: ConfigStyle;
    development: boolean;
    production: boolean;
    postcssOptions: LoaderItem;
    detectDuplicates: boolean;
    htmlTemplatePaths: string[];
    template: "local" | "ssr";
    copyAssets: {
        enable: boolean;
    };
    styleLoaderPath: string;
    cssLoaderPath: string;
    postcssLoaderPath: string;
    sassLoaderPath: string;
    babelLoaderPath: string;
    htmlLoaderPath: string;
    /** Markdown templates: https://webpack.js.org/loaders/remark-loader/ */
    remarkLoaderPath: string;
    fileLoaderPath: string;
    pugLoaderPath: string;
    gqlLoaderPath: string;
    DefinePlugin: typeof DefinePlugin;
    TerserPlugin: typeof TerserPlugin;
    WebpackbarPlugin: typeof WebpackbarPlugin;
    ForkTsCheckerPlugin: typeof ForkTsCheckerPlugin;
    CssExtractPlugin: typeof CssExtractPlugin;
    HtmlWebpackPlugin: typeof HtmlWebpackPlugin;
    nodeExternalsPlugin: typeof NodeExternalsPlugin;
    CopyPlugin: any;
    DuplicatesPlugin: any;
}
