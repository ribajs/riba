import { tFormatterWrapper } from "./t.formatter";
import { I18nModuleOptions } from "../types";
import { FormattersCreator } from "@ribajs/core";

export const formatters: FormattersCreator = (options: I18nModuleOptions) => {
  return {
    t: tFormatterWrapper(options),
  };
};

export default formatters;
