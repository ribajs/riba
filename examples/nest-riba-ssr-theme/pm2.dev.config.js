module.exports = {
  apps: [
    {
      name: "cms:theme:demo:watch",
      script: "yarn run watch:main",
      watch: false,
      instances: 1,
      env: {
        NODE_ENV: "development",
        DEBUG: "",
      },
    },
  ],
};
