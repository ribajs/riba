import { Component } from '../component';

export type ComponentWrapper = (...deps: any[]) => typeof Component;
