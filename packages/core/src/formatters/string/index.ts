import { IFormatters } from '../../interfaces';

// string formatters
import { append } from './append.formatter';
import { downcase } from './downcase.formatter';
import { filled } from './filled.formatter';
import { handleize } from './handleize.formatter';
import { isString } from './isString.formatter';
import { match } from './match.formatter';
import { pluralize } from './pluralize.formatter';
import { prepend } from './prepend.formatter';
import { upcase } from './upcase.formatter';
import { replace } from './replace.formatter';
import { replaceFirst } from './replace-first.formatter';
import { slice } from './slice.formatter';
import { strip } from './strip.formatter';
import { stripHtml } from './strip-html.formatter';
import { stringFormatter } from './string.formatter';

export {
  append, downcase, filled, handleize, isString, match, pluralize, prepend, upcase, replace, replaceFirst, slice, strip, stripHtml, stringFormatter,
};

export const stringFormatters: IFormatters = {
  append, downcase, filled, handleize, isString, match, pluralize, prepend, upcase, replace, 'replace-first': replaceFirst, slice, strip, 'strip-html': stripHtml, 'string': stringFormatter,
};
