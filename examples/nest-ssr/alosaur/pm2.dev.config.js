module.exports = {
    apps: [
      {
        name: "dev:@markus-morische/backend",
        script: "deno run --allow-run scripts.ts watch",
	      // args: "./app.ts",
        // interpreter: "deno",
	      // interpreter_args: "run --allow-net --allow-read --importmap=imports.json --allow-env --config ./tsconfig.json",
        // env: {},
      },
    ],
  };
  
