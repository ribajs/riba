export const mergeObject = (target: any, obj: any) => {
  if (obj) {
    Object.keys(obj).forEach((key) => {
      if (!target[key] || target[key] === {}) {
        target[key] = obj[key];
      }
    });
  }
  return target;
};

/**
 * Test if string is a json string
 * @param str 
 */
export const isJson = (str: string) => {
  try {
    const val = JSON.parse(str);
    return (val instanceof Array || val instanceof Object) ? true : false;
  } catch (error) {
    return false;
  }
};

/**
 * Check if a value is an object than can be observed.
 * @param obj 
 */
export const isObject = (obj: object) => {
  return typeof obj === 'object' && obj !== null;
};

export const getString = (value: string) => {
  return value != null ? value.toString() : undefined;
};

export const times = (n: number, cb: () => void) => {
  for (let i = 0; i < n; i++) {
    cb();
  }
};
