import { IFormatters } from '../../interfaces';

// property / object / array formatters
import { parse } from './parse.formatter';
import { first } from './first.formatter';
import { last } from './last.formatter';
import { contains } from './contains.formatter';
import { get } from './get.formatter';
import { set } from './set.formatter';
import { size } from './size.formatter';
import { empty } from './empty.formatter';
import { isLast } from './isLast.formatter';
import { range } from './range.formatter';

export { parse, first, last, contains, get, set, size, empty, isLast, range };

export const propertyFormatters: IFormatters = {
  parse, first, last, contains, get, set, size, empty, isLast, range,
};
