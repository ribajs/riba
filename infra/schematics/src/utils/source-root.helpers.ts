import { join, normalize } from "@angular-devkit/core";
import { Rule, Tree } from "@angular-devkit/schematics";
import { DEFAULT_SOURCE_ROOT } from "../lib/defaults";

export function isInRootDirectory(
  host: Tree,
  extraFiles: string[] = []
): boolean {
  const files = [".riba-cli.json", "riba-cli.json"].concat(extraFiles || []);
  return files.map((file) => host.exists(file)).some((isPresent) => isPresent);
}

export function mergeSourceRoot<
  T extends { sourceRoot?: string; path?: string } = any
>(options: T): Rule {
  return (host: Tree) => {
    const isInRoot = isInRootDirectory(host, ["tsconfig.json", "package.json"]);

    if (!isInRoot) {
      return host;
    }
    const sourceRoot =
      options.sourceRoot !== undefined
        ? options.sourceRoot
        : DEFAULT_SOURCE_ROOT;

    options.path =
      options.path !== undefined
        ? join(normalize(sourceRoot), options.path)
        : normalize(sourceRoot);
    return host;
  };
}
