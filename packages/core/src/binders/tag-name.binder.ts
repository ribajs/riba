import { Binder } from "../binder.js";

/**
 * tag-*
 * tag-[tagname]
 *
 * Changes the html tag (whatever value is in place of [tagname]) of the element
 * when the value evaluates to true and reverts to the original tag name if the value evaluates to false.
 *
 * TODO test me on value change
 *
 * @example
 * <div rv-tag-a="item.hasHref">{ item.label }</div>
 */
export class TagStarBinder extends Binder<boolean, HTMLElement> {
  static key = "tag-*";
  priority = -1000;

  private originalTag?: string;

  bind(el: HTMLUnknownElement) {
    this.originalTag = el.tagName.toLowerCase();
  }

  routine(oldEl: HTMLUnknownElement, value: boolean) {
    if (this.args === null) {
      throw new Error("args is null");
    }

    const curTagName = this.el.tagName.toLowerCase();
    let tagName: string;
    if (value) {
      tagName = (this.args[0] as string).trim().toLowerCase();
    } else if (this.originalTag) {
      tagName = this.originalTag.toLowerCase();
    } else {
      throw new Error("Tag name not found!");
    }

    if (curTagName !== tagName) {
      const newEl = document.createElement(tagName);

      // Move childs to new element we use this instead if innerHTML to keep the binders alive on this childs
      while (oldEl.childNodes.length > 0) {
        if (oldEl.firstChild) {
          newEl.appendChild(oldEl.firstChild);
        }
      }

      // Copy attributes to new element
      const attributes = Array.prototype.slice.call(oldEl.attributes);
      for (const attribute of attributes) {
        newEl.setAttribute(attribute.name, attribute.value);
      }

      // Replace the old element with the new element
      if (oldEl.parentNode) {
        oldEl.parentNode.replaceChild(newEl, oldEl);
      } else {
        console.warn("No parent");
      }

      this.el = newEl;
    }
  }
}
