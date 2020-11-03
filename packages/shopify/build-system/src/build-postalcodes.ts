import fs from "fs";
import path from "path";
import xlsx from "node-xlsx";
import toSource from "tosource";
import Terser from "terser";
import Prettier from "prettier";
import gulp from "gulp";
import { config } from "./includes/config";

const RENAME_PROPERTIES = {
  iata_code: "ccode",
};
const KEEP_PROPERTIES = ["exact", "low", "high", "city"];
const OUTPUT_FILENAME = "checkout_exclude-express-postalcodes";
const OUTPUT_THEME_SETTINGS_FILENAME = "settings_schema_postalcodes";
const MINIFY = false;
const PRINT = false;
const OUTPUT_AS_JAVASCRIPT_FILE = true;

const isNumeric = function (num: number | string) {
  return !isNaN(num as number);
};

const parseFile = function () {
  const workSheetsFromFile = xlsx.parse(
    path.resolve(__dirname, "..", "International_Extended_Area_Surcharge.xlsx")
  );

  // Remove empty lines
  const cols = Array.from(workSheetsFromFile[0].data).filter(
    (data) => data.length > 3
  );

  // First line are the property names
  const properties = cols[0].map((_property: string | number) => {
    let property = String(_property)
      .toLocaleLowerCase()
      .trim()
      .replace(/\s/g, "_");
    if ((RENAME_PROPERTIES as any)[property] as string | undefined) {
      property = (RENAME_PROPERTIES as any)[property];
    }
    return property;
  });
  cols.splice(0, 1);

  return {
    properties,
    cols,
  };
};

const parseValue = function (val: string | number) {
  if (typeof val === "string") {
    if (val.toLocaleLowerCase() === "no") {
      return false;
    }
    if (val.toLocaleLowerCase() === "yes") {
      return true;
    }
    if (isNumeric(val)) {
      return Number(val);
    }
  }
  return val;
};

const convertColumnToObject = function (col: any, properties: any[]) {
  const obj: any = {};
  for (let i = 0; i < col.length; i++) {
    const value = col[i];
    if (properties[i] && properties[i] !== "ccode") {
      obj[properties[i]] = parseValue(value);
    } else {
      obj[properties[i]] = value;
    }
  }
  return obj;
};

const convertColumnsToObject = function (cols: any[], properties: any[]) {
  const objects = [];
  for (let i = 0; i < cols.length; i++) {
    const col = cols[i];
    const obj = convertColumnToObject(col, properties);
    objects.push(obj);
  }
  return objects;
};

const mergeCountries = function (objects: any[]) {
  const countries: any = {};
  for (let i = 0; i < objects.length; i++) {
    const currObj = objects[i];
    const countryCode = currObj.ccode;
    countries[countryCode] = countries[countryCode] || [];
    countries[countryCode].push(currObj);
  }
  return countries;
};

const clearProperties = function (countries: any) {
  // Remove low and high if they are equal
  for (const countryCode in countries) {
    for (let i = 0; i < countries[countryCode].length; i++) {
      const currObj = countries[countryCode][i];
      if (currObj.low === currObj.high) {
        // Rename low property to exact if its equal
        Object.defineProperty(
          currObj,
          "exact",
          Object.getOwnPropertyDescriptor(currObj, "low")
        );
        delete currObj.low;
        delete currObj.high;
      }
      for (const key in currObj) {
        // Only keep the properties defined in KEEP_PROPERTIES
        if (!KEEP_PROPERTIES.includes(key)) {
          delete currObj[key];
        }
        // delete undefined values
        if (typeof currObj[key] === "undefined") {
          delete currObj[key];
        }
      }
    }
  }
  return countries;
};

const saveThemeSettings = function (countries: any) {
  const themeSettings = {
    name: "Checkout Postalcodes",
    settings: [
      {
        type: "text",
        id: "checkout_postalcodes_country_codes",
        info: "Please do not modify this field",
        label: "Available country codes",
        default: "",
      },
      {
        type: "header",
        content:
          "Enable for the exclude express postalcode script for the following country codes",
      },
    ],
  };

  // Set all available country codes as the default value for 'checkout_postalcodes_country_codes'
  const countryCodes = Object.keys(countries);
  themeSettings.settings[0].default = countryCodes.join(";");

  // Append country codes to theme settings
  for (const countryCode in countries) {
    (themeSettings.settings as any).push({
      type: "checkbox",
      id: "checkout_postalcodes_enable_" + countryCode,
      label: countryCode,
      default: false,
    });
  }
  fs.writeFileSync(
    OUTPUT_THEME_SETTINGS_FILENAME + ".json",
    JSON.stringify(themeSettings, null, 2),
    "utf8"
  );
};

const saveFile = async function (
  countryPostalCodes: any,
  countryCode: string,
  asJavascript = false,
  minify = false,
  print = false
) {
  let filename = path.resolve(
    config.sharedCode.src.root,
    "js",
    `${OUTPUT_FILENAME}_${countryCode}`
  );
  let content = "";
  if (asJavascript) {
    content =
      `(function(window) {\n` +
      `window.rfd = window.rfd || {};\n` +
      `window.rfd.checkout = window.rfd.checkout || {};\n` +
      `window.rfd.checkout.excludeExpressPostalcodes = window.rfd.checkout.excludeExpressPostalcodes || {};\n` +
      `window.rfd.checkout.excludeExpressPostalcodes.${countryCode} = `;
    content += toSource(countryPostalCodes);
    content += '})(typeof(window) !== "undefined" ? window : global);';
    filename += ".js";
  } else {
    content = JSON.stringify(countryPostalCodes);
    filename += ".json";
  }

  if (minify) {
    const result = await Terser.minify(content);
    content = result.code || content;
  } else {
    content = Prettier.format(content, { parser: "babel" });
  }

  if (print) {
    console.dir(content);
  } else {
    fs.writeFileSync(filename, content, "utf8");
  }
};

const saveFiles = async function (
  countries: any[],
  asJavascript = false,
  minify = false,
  print = false
) {
  for (const countryCode in countries) {
    await saveFile(
      countries[countryCode],
      countryCode,
      asJavascript,
      minify,
      print
    );
  }
};

gulp.task("build:postalcodes", async () => {
  const { cols, properties } = parseFile();
  const objects = convertColumnsToObject(cols, properties);
  const countries = mergeCountries(objects);
  clearProperties(countries);
  saveThemeSettings(countries);
  await saveFiles(countries, OUTPUT_AS_JAVASCRIPT_FILE, MINIFY, PRINT);
});
