import { isAvailable, ribaPackages } from "@ribajs/npm-package";
import postcssPresetEnv from "postcss-preset-env";
import purgecssPlugin from "@fullhuman/postcss-purgecss";

const getPurgecssContent = (content) => {
  content = content || ["./**/*.html", "./**/*.pug"];

  for (const ribaPackage of ribaPackages) {
    const ribaPackagePath = isAvailable(ribaPackage);
    if (ribaPackagePath) {
      content.push(
        ribaPackagePath + "/**/*.html",
        ribaPackagePath + "/**/*.pug",
      );
    }
  }

  return content;
};

export default (options) => {
  options = options || {};
  options.env = options.env || {
    production: false,
    development: true,
  };
  options.plugins = options.plugins || [];

  // purgecss options
  options.purgecss = options.purgecss || { enable: false };
  options.purgecss.content = getPurgecssContent(options.purgecss.content);
  options.purgecss.safelist = options.purgecss.safelist || [];

  options.purgecss.safelist.push(
    ...[
      /^toast-.*/,
      /^draggable$/,
      /^popover.*$/,
      /^container.*/,
      /^row.*/,
      /^col.*/,
      /^p.*/,
      /^m.*/,
      /^w.*/,
      /^d.*/,
      /^bg-.*/,
      /^border-.*/,
      /^text-.*/,
      /^align-.*/,
      /^justify-.*/,
      /show$/,
      /showing$/,
      /disabled$/,
      /active$/,
      /x-placement$/,
      /bs-popover-.*$/,
      /rotate-.*$/,
      /size-*$/,
      /^leaflet.*/,
    ],
  );

  // postcss-preset-env options
  options.presetEnv = options.presetEnv || {};
  options.plugins.push(postcssPresetEnv(options.presetEnv));

  // purgecss
  if (options.purgecss.enable) {
    options.plugins.push(purgecssPlugin(options.purgecss));
  }

  return {
    plugins: options.plugins,
  };
};
