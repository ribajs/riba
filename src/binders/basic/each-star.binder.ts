import { BinderWrapper } from '../../binder.service';
import { rangeEachStarFromToBinder } from './range-each-star-star-star.binder';

export const eachStarBinder = rangeEachStarFromToBinder;

/**
 * each-*
 * Appends bound instances of the element in place for each item in the array.
 */
export const eachStarBinderWrapper: BinderWrapper = () => {
  const name = 'each-*';

  return {
    binder: eachStarBinder,
    name,
  };
};
