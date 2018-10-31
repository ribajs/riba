import { IFormatters } from '../../formatter.service';

// property / object / array formatters
import { parse } from './parse.formatter';
import { json } from './json.formatter';
import { first } from './first.formatter';
import { last } from './last.formatter';
import { contains } from './contains.formatter';
import { get } from './get.formatter';
import { set } from './set.formatter';
import { match } from './match.formatter';
import { size } from './size.formatter';
import { empty } from './empty.formatter';
import { isLast } from './isLast.formatter';
import { range } from './range.formatter';

export { parse, json, first, last, contains, get, set, match, size, empty, isLast, range };

export const propertyFormatters: IFormatters = {
  parse, json, first, last, contains, get, set, match, size, empty, isLast, range,
};
