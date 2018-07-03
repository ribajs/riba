/**
 * Add useful general-purpose formatters for Rivets.js
 * Some formatters from cart.js and rivetsjs-stdlib
 * @see https://github.com/discolabs/cartjs/
 * @see https://github.com/matthieuriolo/rivetsjs-stdlib
 * @see https://github.com/JumpLinkNetwork/shopify-productjs
 */

import { IFormatters } from '../../formatter.service';

// compare functions
import { and } from './and.formatter';
import { eq } from './eq.formatter';
import { ne } from './ne.formatter';
import { lt } from './lt.formatter';
import { elt } from './elt.formatter';
import { or } from './or.formatter';
import { not } from './not.formatter';

export { and, eq, ne, lt, elt, or, not };

export const compareFormatters: IFormatters = {
  and, eq, ne, lt, elt, or, not,
}