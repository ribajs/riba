/**
 * See riba/packages/utils/src/type.ts
 */
export const couldBeJson = (str?: string | null) => {
  if (!str || typeof str !== "string") {
    return false;
  }
  str = str.trim();
  return str.charAt(0) === "{" || str.charAt(0) === "[";
};

/**
 * See riba/packages/utils/src/type.ts
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
 *  * See riba/packages/utils/src/type.ts
 * Parses a json string with the special feature that json strings
 * can also have single quotations for defining the properties and values.
 */
export const parseJsonString = (value: string) => {
  let object = null;
  if (!couldBeJson(value)) {
    return object;
  }
  if (isJson(value)) {
    value = value.replace(/&#39;/g, `'`);
    object = JSON.parse(value) || null;
  } else {
    try {
      // Transform an invalid json string with single quotation to a valid json string with double quotation
      value = value.replace(/'/g, '"').replace(/&#39;/g, `'`);
      object = JSON.parse(value) || null;
    } catch (error) {
      console.error(error);
    }
  }
  return object;
};
