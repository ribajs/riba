/**
 * Generates a random color
 * @see https://stackoverflow.com/a/1484514/1465919
 */
export const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const consoleColoured = (
  options: {
    namespace?: string;
    color?: string;
    mode: "debug" | "info" | "log" | "error";
  },
  ...args: unknown[]
) => {
  const printArgs: unknown[] = [];
  if (options.color) {
    if (options.namespace) {
      printArgs.push(
        `%c[${options.namespace}] ${options.mode.toUpperCase()}: ${
          options.color
        }`
      );
    } else {
      printArgs.push(`%c${options.mode.toUpperCase()}: `);
    }
  } else {
    if (options.namespace) {
      printArgs.push(`[${options.namespace}] ${options.mode.toUpperCase()}: `);
    } else {
      printArgs.push(`${options.mode.toUpperCase()}: `);
    }
  }

  printArgs.push(...args);

  console[options.mode](...printArgs);
};
