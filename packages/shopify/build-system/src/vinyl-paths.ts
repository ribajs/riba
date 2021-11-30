import type VinylPaths from "vinyl-paths";

// Import of ESM only package
export const vinylPaths = async (callback?: VinylPaths.Callback) => {
  return import('vinyl-paths').then(({default: vinylPaths}) => vinylPaths(callback));
}