"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// string formatters
const append_formatter_1 = require("./append.formatter");
exports.append = append_formatter_1.append;
const downcase_formatter_1 = require("./downcase.formatter");
exports.downcase = downcase_formatter_1.downcase;
const filled_formatter_1 = require("./filled.formatter");
exports.filled = filled_formatter_1.filled;
const handleize_formatter_1 = require("./handleize.formatter");
exports.handleize = handleize_formatter_1.handleize;
const isString_formatter_1 = require("./isString.formatter");
exports.isString = isString_formatter_1.isString;
const match_formatter_1 = require("./match.formatter");
exports.match = match_formatter_1.match;
const pluralize_formatter_1 = require("./pluralize.formatter");
exports.pluralize = pluralize_formatter_1.pluralize;
const prepend_formatter_1 = require("./prepend.formatter");
exports.prepend = prepend_formatter_1.prepend;
const upcase_formatter_1 = require("./upcase.formatter");
exports.upcase = upcase_formatter_1.upcase;
const replace_formatter_1 = require("./replace.formatter");
exports.replace = replace_formatter_1.replace;
const replace_first_formatter_1 = require("./replace-first.formatter");
exports.replaceFirst = replace_first_formatter_1.replaceFirst;
const slice_formatter_1 = require("./slice.formatter");
exports.slice = slice_formatter_1.slice;
const strip_formatter_1 = require("./strip.formatter");
exports.strip = strip_formatter_1.strip;
const strip_html_formatter_1 = require("./strip-html.formatter");
exports.stripHtml = strip_html_formatter_1.stripHtml;
const string_formatter_1 = require("./string.formatter");
exports.stringFormatter = string_formatter_1.stringFormatter;
exports.stringFormatters = {
    append: append_formatter_1.append, downcase: downcase_formatter_1.downcase, filled: filled_formatter_1.filled, handleize: handleize_formatter_1.handleize, isString: isString_formatter_1.isString, match: match_formatter_1.match, pluralize: pluralize_formatter_1.pluralize, prepend: prepend_formatter_1.prepend, upcase: upcase_formatter_1.upcase, replace: replace_formatter_1.replace, 'replace-first': replace_first_formatter_1.replaceFirst, slice: slice_formatter_1.slice, strip: strip_formatter_1.strip, 'strip-html': strip_html_formatter_1.stripHtml, 'string': string_formatter_1.stringFormatter,
};
