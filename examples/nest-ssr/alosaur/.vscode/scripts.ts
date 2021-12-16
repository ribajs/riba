// Credits https://tuts.alexmercedcoder.com/2021/5/deno_scripts/

// command | deno run --allow-run scripts.ts <script> |

// save the script name in a variable
const scriptName = Deno.args[0]

// create a variable to hold the child process
let p;

const args = ["--allow-net", "--allow-read", "--importmap=imports.json", "--unstable", "--allow-env", "--config", "./tsconfig.json",];

// switch statement for each possible script
switch (scriptName) {

    case "start":
        // run a command
        p = Deno.run({ cmd: ["deno", "run", ...args, "app.ts"] });
        // process output when it completes
        await p.status()
    break;

    case "watch":
        p = Deno.run({ cmd: ["deno", "run", ...args, "--watch", "app.ts"] });
        await p.status()    
    break;

    case "openapi":
        p = Deno.run({ cmd: ["deno", "run", "--allow-read", "--allow-write", "--config", "./src/tsconfig.lib.json", "openapi.ts"] });
        await p.status()    
        break;

    // default output if not a script you made  
    default:
        console.error(`No script "${scriptName}" found!`);
}