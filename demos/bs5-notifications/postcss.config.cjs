const env = {
  development: true,
  production: process.env.NODE_ENV !== "development",
}
module.exports = require("@ribajs/postcss-config")({purgecss: {
  safelist: [
    // Allow all bootstrap colors in the styles
    /-default$/,
    /-primary$/,
    /-secondary$/,
    /-success"$/,
    /-danger$/,
    /-warning$/,
    /-info$/,
    /-light$/,
    /-dark$/,
  ]
}});
