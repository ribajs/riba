import type VinylPaths from "vinyl-paths";

// Import of ESM only package
// See https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c
export const vinylPaths = async (callback?: VinylPaths.Callback) => {
  const { default: vinylPaths } = await import("vinyl-paths");
  return vinylPaths(callback);
};
