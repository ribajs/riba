import { BasicComponent, Binder, View } from "@ribajs/core";
import { TwService } from "../services/tw.service.js";
import {
  parseJsonString,
  jsonStringify,
  camelCase,
} from "@ribajs/utils/src/type.js";

export abstract class TwAbstractBreakpointBinder<
  E extends HTMLElement = HTMLElement,
> extends Binder<string, E> {
  protected abstract defaultAttributeBinder: Binder<
    any,
    HTMLElement | BasicComponent
  >;
  protected tw: TwService;
  protected breakpoint: string;
  protected attributeName: string;
  protected val?: any;

  constructor(
    view: View,
    el: E,
    type: string | null,
    name: string,
    keypath: string | undefined,
    formatters: string[] | null,
    identifier: string | null,
  ) {
    super(view, el, type, name, keypath, formatters, identifier);
    this.tw = TwService.getSingleton();
    if (this.args.length !== 2) {
      throw new Error(
        "The TwAbstractBreakpointBinder was not initialized correctly!",
      );
    }
    const breakpoint = this.args[0].toString();
    const attributeName = this.args[1].toString();
    if (!this.tw.breakpointNames.includes(breakpoint)) {
      throw new Error(
        `Unknown breakpoint "${breakpoint}"! You can define breakpoints at the initialization of the twModule.`,
      );
    }
    this.breakpoint = breakpoint;
    this.attributeName = attributeName;
  }

  protected onBreakpointChanges() {
    this.setAttributeOnMatch();
  }

  protected setAttributeOnMatch() {
    if (!this.tw.activeBreakpoint) return;
    if (this.isBreakpointMatch(this.breakpoint)) {
      return this.defaultAttributeBinder.routine(this.el, this.val);
    }
    if (this.breakpointUnhandled(this.tw.activeBreakpoint.name)) {
      this.defaultAttributeBinder.routine(this.el, undefined);
    }
  }

  protected isBreakpointMatch(breakpoint = this.breakpoint) {
    if (!this.tw.activeBreakpoint) {
      return false;
    }
    if (this.tw.activeBreakpoint.name === breakpoint) {
      return true;
    }
    const myBreakpoints = this.myBreakpoints(breakpoint);
    if (myBreakpoints.includes(this.tw.activeBreakpoint.name)) {
      return true;
    }
    return false;
  }

  protected myBreakpoints(breakpoint = this.breakpoint) {
    const myBreakpoints: string[] = [breakpoint];
    let nextBreakpoint: string | null = breakpoint;
    while (nextBreakpoint) {
      nextBreakpoint = this.tw.getNextBreakpointByName(nextBreakpoint);
      if (!nextBreakpoint || this.breakpointHandledByAnother(nextBreakpoint)) {
        break;
      }
      myBreakpoints.push(nextBreakpoint);
    }
    return myBreakpoints;
  }

  protected breakpointHandledByAnother(name: string) {
    const handledBreakpoints = this.getHandledBreakpoints();
    return handledBreakpoints.includes(name);
  }

  protected breakpointUnhandled(breakpoint: string) {
    let prevBreakpoint: string | null = breakpoint;
    let unhandled = true;
    while (prevBreakpoint && unhandled) {
      if (this.breakpointHandledByAnother(prevBreakpoint)) {
        unhandled = false;
        break;
      }
      prevBreakpoint = this.tw.getPrevBreakpointByName(prevBreakpoint);
      if (!prevBreakpoint) {
        break;
      }
    }
    return unhandled;
  }

  protected addToHandledBreakpoints() {
    const handledBreakpoints = this.getHandledBreakpoints();
    handledBreakpoints.push(this.breakpoint);
    this.el.dataset[camelCase(this.attributeName)] =
      jsonStringify(handledBreakpoints);
  }

  protected getHandledBreakpoints() {
    const handledBreakpoints: string[] = parseJsonString(
      this.el.dataset[camelCase(this.attributeName)] || "[]",
    );
    if (!Array.isArray(handledBreakpoints)) {
      throw new Error("breakpoints dataset has unsupported values!");
    }
    return handledBreakpoints;
  }

  bind(el: HTMLElement) {
    this.tw.on("breakpoint:changed", this.onBreakpointChanges, this);
    if (typeof this.defaultAttributeBinder.bind === "function") {
      this.defaultAttributeBinder.bind(el);
    }
  }

  routine(el: HTMLElement, newValue: any) {
    this.addToHandledBreakpoints();
    this.val = newValue;
    this.setAttributeOnMatch();
  }

  unbind(el: HTMLElement) {
    this.tw?.off("breakpoint:changed", this.onBreakpointChanges, this);
    if (typeof this.defaultAttributeBinder.unbind === "function") {
      this.defaultAttributeBinder.unbind(el);
    }
  }
}
