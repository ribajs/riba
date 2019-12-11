import { Component } from '@ribajs/core';

export class Bs4IconComponent extends Component {

  public static tagName: string = 'bs4-icon';

  static get observedAttributes() {
    return ['size', 'width', 'height', 'src', 'color', 'direction'];
  }

  protected scope: any = {};

  protected autobind = false;

  constructor(element?: HTMLElement) {
    super(element);
  }

  public attributeChangedCallback(name: string, oldValue: any, newValue: any, namespace: string | null) {
    // injects the changed attributes to scope
    super.attributeChangedCallback(name, oldValue, newValue, namespace);

    if (name === 'src') {
      if (fetch) {
        fetch(newValue)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error(response.statusText);
          }
          return response.text();
        })
        .then((response) => {
          this.el.innerHTML = response;
        })
        .catch((error) => {
          console.error(error);
        });
      }

    }

    if (name === 'color') {
      if (newValue.indexOf(',') !== -1) {
        newValue = newValue.split(',');
        if (newValue.length > 0) {
          this.el.className = this.el.className.replace(/(^|\s)color-\S+/g, '');
          for (let i = 0; i < newValue.length; i++) {
            const newColor: string = newValue[i];
            if (newColor.startsWith('#') || newColor.startsWith('rgb')) {
              this.el.style.color = newColor;
            }
            this.el.classList.add(`color-${newColor}`);
          }
        }
      } else {
        this.el.style.color = newValue;
        this.el.className = this.el.className.replace(/(^|\s)color-\S+/g, '');
        this.el.classList.add(`color-${newValue}`);
      }
    }

    if (name === 'size') {
      const size = newValue;
      this.el.style.height = size + 'px';
      this.el.style.width = size + 'px';
      this.el.className = this.el.className.replace(/(^|\s)size-\S+/g, '');
      this.el.classList.add(`size-${size}`);
    }

    if (name === 'width') {
      const width = newValue;
      this.el.style.width = width  + 'px';
      this.el.className = this.el.className.replace(/(^|\s)width-\S+/g, '');
      this.el.classList.add(`width-${width}`);
    }

    if (name === 'height') {
      const height = newValue;
      this.el.style.height = height  + 'px';
      this.el.className = this.el.className.replace(/(^|\s)height-\S+/g, '');
      this.el.classList.add(`height-${height}`);
    }

    if (name === 'direction') {
      const direction = newValue;
      let classString = `direction-${direction}`;
      if (direction === 'left' ) {
        classString += ' rotate-270';
      } else if ( direction === 'left-top' || direction === 'left-up' || direction === 'top-left' || direction === 'up-left' ) {
        classString += ' rotate-315' ;
      } else if ( direction === 'top' || direction === 'up' ) {
        classString += ' rotate-0';
      } else if ( direction === 'top-right' || direction === 'up-right' || direction === 'right-top' || direction === 'right-up') {
        classString += ' rotate-45';
      } else if ( direction === 'right' ) {
        classString += ' rotate-90';
      } else if ( direction === 'right-bottom' || direction === 'right-down' || direction === 'bottom-right' || direction === 'down-right' ) {
        classString += ' rotate-135';
      } else if ( direction === 'bottom' || direction === 'down' ) {
        classString += ' rotate-180';
      } else if ( direction === 'left-bottom' || direction === 'left-down' || direction === 'bottom-left' || direction === 'down-left' ) {
        classString += ' rotate-225';
      }

      this.el.className = this.el.className.replace(/(^|\s)direction-\S+/g, '');
      this.el.className = this.el.className.replace(/(^|\s)rotate-\S+/g, '');
      this.el.className += ' ' + classString;
    }
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.el.setAttribute('aria-hidden', 'true');
    this.el.setAttribute('role', 'img');
    this.el.classList.add('iconset');

    // set default values
    // this.attributeChangedCallback('size', null, 32, null);
    this.attributeChangedCallback('direction', null, 'top', null);

    this.init(Bs4IconComponent.observedAttributes);
  }

  protected template() {
    return null;
  }
}
