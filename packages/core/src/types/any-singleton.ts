export interface AnySingleton<S,> {
  getInstance(...args: any[]): S;
}
