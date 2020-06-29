import { tFormatterWrapper } from "./t.formatter";
import { ALocalesService } from "../services/locales-base.service";
import { Formatters } from "@ribajs/core";

export default (localesService: ALocalesService): Formatters => {
  return {
    t: tFormatterWrapper(localesService),
  };
};
