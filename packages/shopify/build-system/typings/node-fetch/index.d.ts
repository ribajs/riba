declare module "node-fetch" {
  const value: typeof fetch;

  export interface Response {}
  export default value;
}
