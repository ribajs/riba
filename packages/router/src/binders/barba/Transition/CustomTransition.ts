import { Debug, Utils } from '@ribajs/core';
import { BaseTransition } from './BaseTransition';
import { ITransition } from '../interfaces/transition';

declare global {
  // tslint:disable: interface-name
  interface Window { model: any; }
}

/**
 * Basic Transition object, wait for the new Container to be ready,
 * scroll top, and finish the transition (removing the old container and displaying the new one)
 *
 * @private
 */
class CustomTransition extends BaseTransition implements ITransition {

  protected debug = Debug('rivets:CustomTransition');

  public init($oldContainer: JQuery<Element>, newContainer: Promise<JQuery<Element>>): Promise<void> {
    const self = this;

    this.$oldContainer = $oldContainer;
    this.debug('init');

    this.deferred = Utils.deferred();
    const newContainerReady = Utils.deferred();
    this.newContainerLoading = newContainerReady.promise;

    this.start();

    newContainer.then(($newContainer: JQuery<Element>) => {
      self.$newContainer = $newContainer;
      newContainerReady.resolve();
    });

    return this.deferred.promise;
  }

  public start() {
    this.debug('CustomTransition start');
    if (!this.newContainerLoading) {
      throw new Error('this.newContainerLoading is not set');
    }
    this.newContainerLoading.then(this.finish.bind(this));
  }

  public finish($container: JQuery<Element>) {
    document.body.scrollTop = 0;
    this.debug('CustomTransition finish');
    this.done();
  }

}

export { CustomTransition };
