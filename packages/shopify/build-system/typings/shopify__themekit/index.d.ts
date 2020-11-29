declare module "@shopify/themekit" {
  export interface CommandOptions {
    cwd?: string;
    logLevel?: string;
  }

  export interface CommandFlags {
    noIgnore?: boolean;
    env?: string;
    "allow-live": boolean;
    files?: string[];
    ignoredFiles?: string[];
  }

  const value: any;
  export default value;
  const command: (
    command: string,
    flags?: CommandFlags,
    options?: CommandOptions
  ) => Promise<string>;
  export { command };
}
