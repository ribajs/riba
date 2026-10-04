import { Binder, EventBinderChanged } from "@ribajs/core";
import { I18nService } from "../services/i18n.service.js";
import type { LocalesService } from "../services/locales.service.js";
import type { LocalVars } from "../types/index.js";
import { langcodeVariants } from "../utils/environment.js";
import {
  parseInlineTranslations,
  parseTemplateVars,
} from "../utils/template-vars.js";

/**
 * Sets a translation as html, text, value or any attribute (`rv-i18n-<target>`).
 * The content the markup had when the binder bound is the source: it is
 * restored when the source language is active or a key has no translation.
 */
export class I18nStarBinder extends Binder<string, HTMLInputElement> {
  static key = "i18n-*";
  priority = 0;

  private service?: LocalesService;
  private target = "";
  private contenteditable = false;
  private path?: string;
  private started = false;
  private vars: LocalVars = {};
  private inline: Record<string, string> = {};
  /** `null` is an attribute that did not exist */
  private source: string | null = null;
  /** What this binder last wrote, so unchanged content is not rewritten and child bindings survive */
  private applied: string | null = null;
  private unsubscribes: Array<() => void> = [];

  private readonly onRender = () => this.render();

  private readonly onAttributeChanged = (event: Event) => {
    const { name, newValue } = (event as EventBinderChanged).detail;
    if (name?.startsWith("data-")) {
      this.vars[name.slice(5)] = newValue;
      this.render();
    }
  };

  private read(): string | null {
    switch (this.target) {
      case "html":
        return this.el.innerHTML;
      case "text":
        return this.el.textContent;
      case "value":
        return this.contenteditable ? this.el.innerHTML : this.el.value;
      default:
        return this.el.getAttribute(this.target);
    }
  }

  private write(value: string | null) {
    switch (this.target) {
      case "html":
        this.el.innerHTML = value ?? "";
        break;
      case "text":
        this.el.textContent = value ?? "";
        break;
      case "value":
        if (this.contenteditable) {
          this.el.innerHTML = value ?? "";
        } else {
          this.el.value = value ?? "";
        }
        break;
      default:
        if (value === null) {
          this.el.removeAttribute(this.target);
        } else {
          this.el.setAttribute(this.target, value);
        }
    }
  }

  private inlineFor(langcode: string): string | undefined {
    for (const variant of langcodeVariants(langcode)) {
      if (this.inline[variant] !== undefined) {
        return this.inline[variant];
      }
    }
    return undefined;
  }

  /** Inline `<template lang>` > key > `<template lang="default">` > source */
  private resolve(service: LocalesService): string | null {
    const langcode = service.getLangcode() as string;
    const inline = this.inlineFor(langcode);
    if (inline !== undefined) {
      return inline;
    }
    if (this.path) {
      const found = service.lookup(this.path, this.vars);
      if (found !== undefined) {
        return found;
      }
    }
    if (this.inline.default !== undefined) {
      return this.inline.default;
    }
    if (this.path) {
      const handled = service.translate(this.path, this.vars);
      if (handled !== undefined) {
        return handled;
      }
    }
    return this.source;
  }

  private render() {
    const service = this.service;
    if (!service?.ready) {
      return;
    }
    let next: string | null;
    try {
      next = this.resolve(service);
    } catch (error) {
      console.error(error);
      next = this.source;
    }
    if (next !== this.applied) {
      this.write(next);
      this.applied = next;
    }
  }

  bind(el: HTMLInputElement) {
    this.contenteditable = !!el.getAttribute("contenteditable");
    this.target = this.args[0].toString();
    this.service = I18nService.getLocalesService();
    this.source = this.read();
    this.applied = this.source;
  }

  routine(el: HTMLElement, path?: string) {
    if (!this.started) {
      this.started = true;
      this.vars = { ...parseTemplateVars(el) };
      for (const [name, value] of Object.entries(el.dataset)) {
        if (value !== undefined) {
          this.vars[name] = value;
        }
      }
      this.inline = parseInlineTranslations(el);
      this.unsubscribes.push(
        this.service?.on("ready", this.onRender) as () => void,
        this.service?.on("changed", this.onRender) as () => void,
      );
      el.addEventListener("binder-changed", this.onAttributeChanged);
    }
    this.path = path || undefined;
    this.render();
  }

  unbind() {
    this.el.removeEventListener("binder-changed", this.onAttributeChanged);
    this.unsubscribes.forEach((unsubscribe) => unsubscribe());
    this.unsubscribes = [];
    this.started = false;
  }
}
