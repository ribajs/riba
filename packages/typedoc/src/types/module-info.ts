export interface ModuleInfo {
  name: string;
  // fullName: string;
  path: string;
  parent?: ModuleInfo;
}
