import Debug from 'debug';
import { BaseTransition, ITransition } from './BaseTransition';

/**
 * Basic Transition object, wait for the new Container to be ready,
 * scroll top, and finish the transition (removing the old container and displaying the new one)
 *
 * @private
 * @namespace Barba.HideShowTransition
 * @augments Barba.BaseTransition
 */
class HideShowTransition extends BaseTransition implements ITransition {

  protected debug = Debug('barba:HideShowTransition');

  public start() {
    if(!this.newContainerLoading) {
      throw new Error('this.newContainerLoading is not set');
    }
    this.newContainerLoading.then(this.finish.bind(this));
  }

  public finish() {
    document.body.scrollTop = 0;
    this.done();
  }
}

export { HideShowTransition };
