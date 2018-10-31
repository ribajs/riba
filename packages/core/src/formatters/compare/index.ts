/**
 * Add useful general-purpose formatters for Rivets.js
 * Some formatters from cart.js and rivetsjs-stdlib
 * @see https://github.com/discolabs/cartjs/
 * @see https://github.com/matthieuriolo/rivetsjs-stdlib
 * @see https://github.com/JumpLinkNetwork/shopify-productjs
 */

import { IFormatters } from '../../services/formatter.service';

// compare functions
import { and } from './and.formatter';
import { between } from './between.formatter';
import { egt } from './egt.formatter';
import { eq } from './eq.formatter';
import { gt } from './gt.formatter';
import { ne } from './ne.formatter';
import { lt } from './lt.formatter';
import { elt } from './elt.formatter';
import { or } from './or.formatter';
import { not } from './not.formatter';

export { and, between, egt, eq, gt, ne, lt, elt, or, not };

export const compareFormatters: IFormatters = {
  and, between, egt, eq, gt, ne, lt, elt, or, not,
};
