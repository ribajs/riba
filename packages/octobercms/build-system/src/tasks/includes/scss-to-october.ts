import * as Stream from "stream";
import * as Path from "path";
import * as yaml from "js-yaml";
import "../../types/index";
import rgbRegex from "rgb-regex";
import hexRegex = require("hex-color-regex");

function scssToOctoberYml() {
  const stream = new Stream.Transform({ objectMode: true });

  stream._transform = function (originalFile, _, callback) {
    const file = originalFile.clone({ contents: false });

    if (file.isBuffer()) {
      file.path =
        Path.dirname(file.path) +
        "/" +
        Path.basename(file.path, ".scss") +
        ".yml"; //change path ext to .yml

      //split scss file into lines, only lines including octoberyml: {} will be converted to a configuration option
      const lines = file.contents.toString().split(/(?:\r\n|\r|\n)/g);

      const commentPattern = /^ {0,}\$(.{1,}?): {0,}(.*?) {0,}(!default)? {0,}; {0,}\/{2} {0,}octoberyml: {0,}(\{ {0,}.{0,} {0,}\})$/i;
      const spacerPattern = /^ {0,}\/{2} {0,}octoberyml: {0,}(\{ {0,}.{0,} {0,}\})$/i;

      const variables: any = {};

      for (const line of lines) {
        let match = line.match(commentPattern);
        if (match != null) {
          const variableName = match[1];
          const sanatizedVariableName = variableName.replace(/-/g, "_");
          const defaultValue = match[2];
          let options: any = {};
          options.label = variableName.replace(/-/g, " ").replace(/_/g, "-");
          options.type = "text";
          if (isColor(defaultValue)) {
            options.type = "colorpicker";
          }
          try {
            options = { ...options, ...looseJsonParse(match[4]) };
          } catch (e) {
            throw new Error("invalid options string: " + options);
          }
          variables[sanatizedVariableName] = {
            default: defaultValue,
            assetVar: variableName,
            ...options,
          };
        } else {
          match = line.match(spacerPattern);
          if (match != null) {
            let options: any = {};
            options.type = "section";
            try {
              options = { ...options, ...looseJsonParse(match[1]) };
            } catch (e) {
              throw new Error("invalid options string: " + options);
            }
            variables[Math.random().toString(36).substring(7)] = {
              ...options,
            };
          }
        }
      }

      //dump
      if (Object.keys(variables).length === 0) {
        file.contents = Buffer.from("");
      } else {
        file.contents = Buffer.from(
          yaml.safeDump(variables, {
            styles: {
              "!!null": "canonical", // dump null as ~
            },
          })
        );
      }
      console.log("\n### OUTPUT ###\n");
      console.log(file.contents.toString());
    }
    callback(null, file);
  };

  return stream;
}

/**
 * @see https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/eval
 * @param obj
 */
function looseJsonParse(obj: any) {
  return Function('"use strict";return (' + obj + ")")(); //@reviewer, don't use Function? alternative would be JSON.parse()
}

function isColor(strColor: string) {
  return (
    rgbRegex({ exact: true }).test(strColor) || hexRegex({}).test(strColor)
  );
}

export { scssToOctoberYml };
