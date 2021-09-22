/**
 * Fixed version of typeof operator
 * @param obj
 * @see https://goo.gl/pxwQGp
 */
export const toType = (obj: any) => {
  const matches = {}.toString.call(obj).match(/\s([a-z]+)/i);
  return matches ? matches[1].toLowerCase() : null;
};

export const couldBeJson = (str?: string | null) => {
  if (!str || typeof str !== "string") {
    return false;
  }
  str = str.trim();
  return str.charAt(0) === "{" || str.charAt(0) === "[";
};

/**
 * Test if string is a json string
 * @param str
 */
export const isJson = (str?: string | null) => {
  if (!str || !couldBeJson(str)) {
    return false;
  }
  try {
    const val = JSON.parse(str);
    return Array.isArray(val) || typeof val === "object" ? true : false;
  } catch (error) {
    return false;
  }
};

/**
 * TODO merge with parseType in ./packages/core/src/parsers.ts
 */
export const parseType = (input?: string) => {
  let type = "undefined";
  let value: any = input;
  if (input === undefined) {
    return { type, value: undefined };
  }
  if (input === "true") {
    value = true;
  } else if (input === "false") {
    value = false;
  } else if (input === "null") {
    value = null;
  } else if (input === "undefined") {
    value = undefined;
  } else if (input === "") {
    value = "";
  } else if (!isNaN(Number(input))) {
    value = Number(input);
  } else if (couldBeJson(value)) {
    const jsonString = parseJsonString(value);
    value = jsonString ? jsonString : value;
  }
  type = typeof value;
  return { type, value };
};

/**
 * Parses a json string with the special feature that json strings
 * can also have single quotations for defining the properties and values
 */
export const parseJsonString = (value: string) => {
  let object = null;
  if (!couldBeJson(value)) {
    return object;
  }
  if (isJson(value)) {
    object = JSON.parse(value) || null;
  } else {
    try {
      // Transform an invalid json string with single quotation to a valid json string with double quotation
      object = JSON.parse(value.replace(/'/g, '"')) || null;
    } catch (error) {
      console.warn(error);
    }
  }
  return object;
};

/**
 * Check if value is undefined
 */
export const isUndefined = (value?: any) => {
  return typeof value === "undefined";
};

/**
 * Check if value is undefined
 */
export const isDefined = (value?: any) => {
  return !isUndefined(value);
};

/**
 * Check if type is Object
 * @see https://stackoverflow.com/a/4775737/1465919
 */
export const isObject = (obj: any) => {
  return isDefined(obj) && typeof obj === "object" && obj !== null;
};

/**
 * Parse value to string or return undefined if value is null
 * @param value
 */
export const getString = (value: any) => {
  return value?.toString ? value.toString() : undefined;
};

/**
 * Parse value to number or return 0 if value is null or undefined
 * @param value
 */
export const getNumber = (value: string) => {
  return value ? parseFloat(value) : undefined;
};

/**
 * Check if value is a function
 */
export const isFunction = (value: any) => {
  return typeof value === "function";
};

/**
 * @Depricated Use Array.isArray instead
 * Check if variable is an Array
 * @see https://stackoverflow.com/a/4775737/1465919
 */
export const isArray = Array.isArray;

/**
 * Check whether variable is number or a string with numbers in JavaScript
 * @see https://stackoverflow.com/a/1421988/1465919
 */
export const isNumber = (value?: any): boolean => {
  return !isNaN(parseFloat(value)) && !isNaN(value - 0);
};

/**
 * Check if type is Boolean
 * @see https://stackoverflow.com/a/28814615/1465919
 */
export const isBoolean = (value?: any) => {
  return typeof value === typeof true;
};

/**
 * Check if value is a string
 */
export const isString = (value?: any) => {
  return typeof value === "string";
};

/**
 * Check if string contains a number
 */
export const stringHasNumber = (value: string) => {
  return isString(value) && /\d/.test(value);
};

/**
 * Check if string contains only numbers
 */
export const stringHasOnlyNumbers = (value?: any) => {
  return /^\d+$/.test(value);
};

/**
 * Check if string contains only numbers, +, - and ()
 */
export const stringIsPhoneNumber = (value: string) => {
  return /^[0-9 ()+-]+$/.test(value);
};

/**
 * Just get the digits of a string, useful to remove px pixel from css value
 *
 * @see http://stackoverflow.com/a/1100653/1465919
 */
export const justDigits = (str: string | number) => {
  if (typeof str === "number") {
    return str;
  }
  const num = str.replace(/[^-\d.]/g, "");
  if (!isNumber(num)) {
    return 0;
  } else {
    return Number(num);
  }
};

export const escapeHtml = (str: string) => {
  const tagsToReplace = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
  };

  return str.replace(/[&<>]/g, (tag) => {
    return tagsToReplace[tag as "&" | "<" | ">"] || tag;
  });
};

/**
 * Remove all special chars from a string
 * @see https://stackoverflow.com/a/11090301/1465919
 * @param str
 */
export const withoutSpecialChars = (str: string) => {
  // str = str.replace(/[^\w\s]/gi, ""); // http://stackoverflow.com/a/4374890
  str = str.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/gi, "");
  return str;
};

/**
 * Removes multiple tabs, newlines, etc from a string
 * @param str
 */
export const withoutMultiWhitespace = (str: string) => {
  str = str.replace(/\s\s+/g, " ");
  return str;
};

/**
 * Formats a string into a handle.
 * E.g. '100% M & Ms!!!' -> 100-m-ms
 * @see https://help.shopify.com/themes/liquid/filters/string-filters#handle-handleize
 */
export const handleize = (str: string) => {
  str = str.trim();
  str = withoutMultiWhitespace(str);
  str = withoutSpecialChars(str);
  str = str.toLowerCase();
  str = str.replace(/ /g, "-");
  return str;
};

export const stripHtml = (html: string) => {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

/**
 * foo-bar -> fooBar
 * Returns a camel-cased version of the string. Used when translating an
 * element's attribute name into a property name for the component's scope.
 * @param str
 */
export const camelCase = (str: string) => {
  return str.replace(/-([a-z0-9])/g, (grouped) => {
    return grouped[1].toUpperCase();
  });
};

/**
 * fooBar -> foo-bar
 */
export const kebabCase = (str: string) => {
  return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
};

/**
 * uppercase's the first letter of a string
 * @param str
 */
export const capitalize = (str: string) => {
  if (typeof str !== "string") return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Merge the contents of two or more objects together into the first object.
 * @param deep If true, the merge becomes recursive (aka. deep copy).
 * @param target An object that will receive the new properties
 * @param objects The objects containing additional properties to merge in.
 * @see http://www.damirscorner.com/blog/posts/20180216-VariableNumberOfArgumentsInTypescript.html
 * @see https://gomakethings.com/merging-objects-with-vanilla-javascript/
 */
export const extend = (
  options: {
    /** Deep merge, if true compares also nested objects */
    deep?: boolean;
    /** Keep existing values, if true only undefined target values will be overwritten with the source value */
    keepValues?: boolean;
    /** If true only overwrite target values if the source value is defined / not undefined */
    onlyDefined?: boolean;
    /** merge arrays, if true, two arrays will be merged into one */
    mergeArrays?: boolean;
  } = {},
  extended: any = {},
  ...objects: any[]
) => {
  // Merge the object into the extended object
  const merge = (obj: any) => {
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (
          options.deep &&
          Object.prototype.toString.call(obj[prop]) === "[object Object]"
        ) {
          // If we're doing a deep merge and the property is an object
          extended[prop] = extend(options, extended[prop], obj[prop]);
        } else {
          // Otherwise, do a regular merge
          if (options.keepValues) {
            // Only overwrite target value if the target value is undefined
            if (typeof extended[prop] === "undefined") {
              extended[prop] = obj[prop];
            }
          } else if (options.onlyDefined) {
            // Only overwrite target value if the source value is defined / not undefined
            if (typeof obj[prop] !== "undefined") {
              extended[prop] = obj[prop];
            }
          } else if (options.mergeArrays) {
            // Merge array if both values are array's
            if (Array.isArray(extended[prop]) && Array.isArray(obj[prop])) {
              extended[prop] = [...extended[prop], ...obj[prop]];
            } else {
              extended[prop] = obj[prop];
            }
          } else {
            extended[prop] = obj[prop];
          }
        }
      }
    }
  };

  // Loop through each object and conduct a merge
  for (let i = 0; i < objects.length; i++) {
    merge(objects[i]);
  }

  return extended;
};

/**
 * @depricated Use `extend` instead.
 * Concat the contents of two (or more) objects together into the first object and return the concatenated object.
 * @param deep If true, the merge becomes recursive (aka. deep copy).
 * @param target An object that will receive the new properties
 * @param objects The objects containing additional properties to merge in.
 */
export const concat = extend;

/**
 * Clone an object, array or any primitive type like numbers or strings.
 * @param deep If true, the merge becomes recursive (aka. deep copy).
 * @param val The value(s) to clone
 */
export const clone = <T = any>(deep: boolean, val: T): T => {
  if (Array.isArray(val)) {
    if (deep) {
      return (val as any).map((x: any) => clone<any>(true, x));
    } else {
      return (val as any).slice();
    }
  }
  if (isObject(val)) {
    return extend({ deep }, {}, val);
  }
  // Primitive types like numbers and strings are copied by default
  return val;
};

/**
 * Get the class `"that"`
 * @param that
 */
export const classOf = (that: any) => {
  return that.constructor;
};

/**
 * Removes internal riba properties from an object
 * @param obj
 * @return Cleared new object
 */
export const clearObjFromRiba = (
  obj: Record<string, any> | Array<any>
): Record<string, any> | Array<any> => {
  if (Array.isArray(obj)) {
    return (obj as Array<any>).map((x: any) =>
      isObject(x) ? clearObjFromRiba(x) : x
    );
  }
  const newObj: any = {};
  for (const key in obj) {
    if (key !== "__rv") {
      if (isObject(obj[key])) {
        newObj[key] = clearObjFromRiba(obj[key]);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  return newObj;
};

/**
 * Generate a Hash from string
 * @param str The string
 * @returns hash code
 * @see https://stackoverflow.com/a/7616484
 */
export const hashCode = (str: string) => {
  let hash = 0;
  let i: number;
  let chr: number;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};
