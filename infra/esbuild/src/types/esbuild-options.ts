export interface ESBuildConfig {
  entryPoints: string[];
  bundle: boolean;
  outfile: string;
  plugins: any[];
}