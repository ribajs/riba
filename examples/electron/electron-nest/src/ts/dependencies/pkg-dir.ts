// Import ESM Module into CommonJS
// See https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c
export const pkgDir = async (cwd?: string | undefined) => {
  const { packageDirectory } = await import("pkg-dir");
  return packageDirectory({ cwd });
};

export default pkgDir;
