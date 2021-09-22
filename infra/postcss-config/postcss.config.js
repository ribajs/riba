
const { isAvailable, ribaPackages } = require('@ribajs/npm-package');

const getPurgecssContent = (content) => {
  content = content || ['./**/*.html', './**/*.pug'];

  for (const ribaPackage of ribaPackages) {
    const ribaPackagePath = isAvailable(ribaPackage);
    if(ribaPackagePath) {
      content.push(ribaPackagePath + '/**/*.html', ribaPackagePath + '/**/*.pug')
    }
  }

  return content;
}

module.exports = (options) => {
  options = options || {};
  options.env = options.env || {
    production: false,
    development: true
  }
  options.plugins = options.plugins || [];
  
  // purgecss options
  options.purgecss = options.purgecss || {};
  options.purgecss.content = getPurgecssContent(options.purgecss.content);
  options.purgecss.safelist = options.purgecss.safelist || []

  options.purgecss.safelist.push(...[
    // See https://github.com/bootstrap-vue/bootstrap-vue/issues/5082#issuecomment-608500908

    // Riba dynamic classes
    /^toast-.*/, // THe toast color class is dynamically added
    /^draggable$/, // Dynamically added in slideshows

    // Bootstrap Components
    /^popover.*$/, // Bootstrap Popover used in tagged-image component

    // Bootstrap Grid (e.g. used dynamically in content-slider)
    /^container.*/,
    /^row.*/,
    /^col.*/,

    // Bootstrap Utility classes
    /^p.*/, // padding
    /^m.*/, // margin
    /^w.*/, // width
    /^d.*/, // display
    /^bg-.*/, // background colors
    /^border-.*/, // border utilities
    /^text-.*/, // text utilities/colors
    /^align-.*/, // alignment utilities
    /^justify-.*/, // justification utilities

    // Bootstrap dynamic classes and animations (e.g. the "show" class is added by javascript)
    /show$/,
    /showing$/,
    /disabled$/,
    /active$/,
    /x-placement$/, // x-placement attribute for dropdown placements
    /bs-popover-.*$/, // Popover position

    /rotate-.*$/, // bs5-icon
    /size-*$/, // bs5-icon

    // Leaflet
    /^leaflet.*/,

  ]);

  // Disable postcss-preset-env temporary

  // postcss-preset-env options
  // options.presetEnv = options.presetEnv || {};

  // const presentEnv = require("postcss-preset-env");
  // options.plugins.push(presentEnv(options.presetEnv)) 

  if (options.env.production) {
    const purgecss = require('@fullhuman/postcss-purgecss');
    options.plugins.push(purgecss(options.purgecss))
  }

  return {
    plugins: options.plugins,
  };
}

