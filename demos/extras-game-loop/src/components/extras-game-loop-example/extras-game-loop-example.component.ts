/**
 * This example and the Gameloop are based on this greate blo article: https://isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing
 */

import {
  Component,
} from '@ribajs/core';

import {
  Gameloop,
} from '@ribajs/extras';

import template from './extras-game-loop-example.component.html';

export class ExtrasGameLoopExampleComponent extends Component {

  public static tagName: string = 'rv-extras-game-loop-example';

  protected boxPos = 10;

  protected boxLastPos = 10;

  protected boxVelocity = 0.08;

  protected limit = 300;

  protected scope = {
    fps: 60,
    left: '10px',
    color: 'red',
  };

  constructor(element?: HTMLElement) {
    super(element);
  }

  protected connectedCallback() {
    super.connectedCallback();
    Gameloop.events.on('update', this.update.bind(this));
    Gameloop.events.on('render', this.render.bind(this));
    Gameloop.events.on('end', this.end.bind(this));
    Gameloop.startLoop();
    return this.init([]);
  }

  protected update(delta: number) {
    this.boxLastPos = this.boxPos;
    this.boxPos += this.boxVelocity * delta;
    // Switch directions if we go too far
    if (this.boxPos >= this.limit || this.boxPos <= 0) this.boxVelocity = -this.boxVelocity;
  }

  protected render(interp: number) {
    this.scope.left = (this.boxLastPos + (this.boxPos - this.boxLastPos) * interp) + 'px';
    this.scope.fps = Math.round(Gameloop.getFps());
  }

  protected end() {
    if (this.scope.fps < 25) {
      this.scope.color = 'black';
    }
    else if (this.scope.fps > 30) {
      this.scope.color = 'red';
    }
  }

  protected template() {
    return template;
  }
}
