/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.3.1): dom/selector-engine.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * see https://github.com/twbs/bootstrap/blob/master/js/src/dom/selector-engine.js
 * --------------------------------------------------------------------------
 */

import { Utils } from '../utils.service'

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NODE_TEXT = 3

class SelectorEngine {
  public static matches(element: HTMLElement | Node & ParentNode, selector: string) {
    return Element.prototype.matches.call(element, selector)
  }

  public static find(selector: string, element = document.documentElement) {
    return Element.prototype.querySelectorAll.call(element, selector)
  }

  public static findOne(selector: string, element = document.documentElement) {
    return Element.prototype.querySelector.call(element, selector)
  }

  public static children(element: HTMLElement, selector: string) {
    const children = Utils.makeArray(element.children)
    return children.filter(child => this.matches(child, selector))
  }

  public static parents(element: HTMLElement, selector: string) {
    const parents = []

    let ancestor = element.parentNode

    while (ancestor && ancestor.nodeType === Node.ELEMENT_NODE && ancestor.nodeType !== NODE_TEXT) {
      if (this.matches(ancestor, selector)) {
        parents.push(ancestor)
      }

      ancestor = ancestor.parentNode
    }

    return parents
  }

  public static closest(element: HTMLElement, selector: string) {
    return Element.prototype.closest.call(element, selector)
  }

  public static prev(element: HTMLElement, selector: string) {
    const siblings = []

    let previous = element.previousSibling

    while (previous && previous.nodeType === Node.ELEMENT_NODE && previous.nodeType !== NODE_TEXT) {
      if (this.matches(previous as HTMLElement, selector)) {
        siblings.push(previous)
      }

      previous = previous.previousSibling
    }

    return siblings
  }
}

export default SelectorEngine
