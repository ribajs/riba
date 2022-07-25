import "./types/esbuild.js";
import { Config } from "./types/index.js";
import esbuild from "esbuild";
import { parseConfig } from "./config.js";

export default async (config: Partial<Config> = {}) => {
  const conf = await parseConfig(config);
  try {
    await esbuild.build(conf.esbuild);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
