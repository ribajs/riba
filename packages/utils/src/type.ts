
export const couldBeJson = (str?: string | null) => {
  if (!str || typeof str !== "string") {
    return false;
  }
  str = str.trim();
  return str.startsWith("{") || str.startsWith("[");
}

/**
 * Test if string is a json string
 * @param str
 */
export const isJson = (str?: string | null) => {
  if (!str) {
    return false;
  }
  try {
    const val = JSON.parse(str);
    return Array.isArray(val) || typeof val === "object" ? true : false;
  } catch (error) {
    return false;
  }
}

/**
 * Check if value is undefined
 */
export const isUndefined = (value?: any) => {
  return typeof value === "undefined";
}

/**
 * Check if value is undefined
 */
export const isDefined = (value?: any) => {
  return !isUndefined(value);
}

/**
 * Check if type is Object
 * @see https://stackoverflow.com/a/4775737/1465919
 */
export const isObject = (obj: object) => {
  return isDefined(obj) && typeof obj === "object" && obj !== null;
}

/**
 * Parse value to string or return undefined if value is null
 * @param value
 */
export const getString = (value: string) => {
  return value != null ? value.toString() : undefined;
}

/**
 * Parse value to number or return 0 if value is null or undefined
 * @param value
 */
export const getNumber = (value: string) => {
  return value ? parseFloat(value) : undefined;
}

/**
 * Parses a json string with the special feature that json strings
 * can also havesingle quotations for defining the properties and values
 */
export const parseJsonString = (value: string) => {
  let object = null;
  if (couldBeJson(value)) {
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
  }
  return object;
}

/**
 * Check if value is a function
 */
export const isFunction = (value: any) => {
  return typeof value === "function";
}

/**
 * Check if variable is an Array
 * @see https://stackoverflow.com/a/4775737/1465919
 */
export const isArray = (value: any) => {
  return Object.prototype.toString.call(value) === "[object Array]";
}

/**
 * Check whether variable is number or a string with numbers in JavaScript
 * @see https://stackoverflow.com/a/1421988/1465919
 */
export const isNumber = (value?: any): boolean => {
  return !isNaN(parseFloat(value)) && !isNaN(value - 0);
}

/**
 * Check if type is Boolean
 * @see https://stackoverflow.com/a/28814615/1465919
 */
export const isBoolean = (value?: any) => {
  return typeof value === typeof true;
}

/**
 * Check if value is a string
 */
export const isString = (value?: any) => {
  return isDefined(value) && typeof value === "string";
}

/**
 * Check if string contains a number
 */
export const stringHasNumber = (value: string) => {
  return isString(value) && /\d/.test(value);
}

/**
 * Check if string contains only numbers
 */
export const stringHasOnlyNumbers = (value?: any) => {
  return /^\d+$/.test(value);
}

/**
 * Check if string contains only numbers, +, - and ()
 */
export const stringIsPhoneNumber = (value: string) => {
  return /^[0-9 ()+-]+$/.test(value);
}

/**
 * Just get the digits of a string, useful to remove px pixel from css value
 *
 * @see http://stackoverflow.com/a/1100653/1465919
 */
export const justDigits = (str: string) => {
  const num = str.replace(/[^-\d.]/g, "");
  if (!isNumber(num)) {
    return 0;
  } else {
    return Number(num);
  }
}

export const escapeHtml = (str: string) => {
  const tagsToReplace = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
  };

  return str.replace(/[&<>]/g, (tag) => {
    return tagsToReplace[tag as "&" | "<" | ">"] || tag;
  });
}

/**
 * Returns a camel-cased version of the string. Used when translating an
 * element's attribute name into a property name for the component's scope.
 * @param string
 */
export const camelCase = (str: string) => {
  return str.replace(/-([a-z0-9])/g, (grouped) => {
    return grouped[1].toUpperCase();
  });
};

  /**
   * Merge the contents of two or more objects together into the first object.
   * @param {boolean} deep If true, the merge becomes recursive (aka. deep copy).
   * @param {object} target An object that will receive the new properties
   * @param {any[]} objects The objects containing additional properties to merge in.
   * @see http://www.damirscorner.com/blog/posts/20180216-VariableNumberOfArgumentsInTypescript.html
   */
  export const extend = (deep: boolean, extended: any = {}, ...objects: any[]) => {
    // Merge the object into the extended object
    const merge = (obj: any) => {
      for (const prop in obj) {
        if (obj[prop]) {
          if (
            deep &&
            Object.prototype.toString.call(obj[prop]) === "[object Object]"
          ) {
            // If we're doing a deep merge and the property is an object
            extended[prop] = extend(true, extended[prop], obj[prop]);
          } else {
            // Otherwise, do a regular merge
            extended[prop] = obj[prop];
          }
        }
      }
    };

    // Loop through each object and conduct a merge
    for (let i = 0; i < objects.length; i++) {
      merge(objects[i]);
    }

    return extended;
  }

  /**
   * Concat the contents of two objects together into the first object and return the concatenated object.
   * @param {boolean} deep If true, the merge becomes recursive (aka. deep copy).
   * @param {object} object1 An first object containing properties to concat.
   * @param {object} object2 The second object containing properties to concat.
   */
  export const concat = (deep: boolean, object1?: object, object2?: object): any => {
    object1 = extend(deep, object1 || {}, object1 || {}, object2 || {});
    return object1;
  }

  /**
   * Clone an object or array
   * @param deep If true, the merge becomes recursive (aka. deep copy).
   * @param val The value(s) to clone
   */
  export const clone = (deep: boolean, val: any) => {
    if (isArray(val)) {
      return val.slice();
    }
    if (isObject(val)) {
      return extend(deep, {}, val);
    }
    if (isString(val)) {
      return val.repeat(1);
    }
    return val;
  }
