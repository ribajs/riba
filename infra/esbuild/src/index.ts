import './types/esbuild';
import { Config } from './types';
import esbuild from 'esbuild';
import { parseConfig } from './config';

export default async (config: Partial<Config> = {}) => {
  const conf = parseConfig(config);
  try {
    await esbuild.build(conf.esbuild);
  } catch (error) {
    console.error(error);
    process.exit(1)
  }
}