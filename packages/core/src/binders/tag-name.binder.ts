import { Binder } from "../interfaces";
// import { View } from "../view";

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
export const tagStarBinder: Binder<boolean> = {
  name: "tag-*",
  priority: -1000,

  bind(el: HTMLUnknownElement) {
    this.customData = {
      originalTag: el.tagName.toLowerCase(),
    };
  },

  routine(oldEl: HTMLUnknownElement, value: boolean) {
    if (this.args === null) {
      throw new Error("args is null");
    }

    const curTagName = this.el.tagName.toLowerCase();
    let tagName: string;
    if (value) {
      tagName = (this.args[0] as string).trim().toLowerCase();
    } else {
      tagName = this.customData.originalTag.toLowerCase();
    }

    if (curTagName !== tagName) {
      const newEl = document.createElement(tagName);

      // Move childs to new element we use this instead if innerHTML to keep the binders alive on this childs
      while (oldEl.childNodes.length > 0) {
        newEl.appendChild(oldEl.firstChild);
      }

      // Copy attributes to new element
      const attributes = Array.prototype.slice.call(oldEl.attributes);
      for (const attribute of attributes) {
        console.debug("attribute", attribute);
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
  },
};
