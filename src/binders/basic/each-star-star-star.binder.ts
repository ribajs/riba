import { IBindable } from '../../binding';
import { ITwoWayBinder, BinderWrapper } from '../../binder.service';
import { eachStarBinder } from './each-star.binder';

/**
 * each-*-*-*
 * wich means each-[modelname]-[startrange]-[endrange]
 * Appends bound instances of the element in place for each item in the array but only if index is in range
 */
export const eachStarStarStarBinderWrapper: BinderWrapper = () => {
  const name = 'range-each-*-*-*';

  return {
    binder: eachStarBinder,
    name,
  };
};
