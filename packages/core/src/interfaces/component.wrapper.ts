import { Component } from '../component';
import { Type } from '../interfaces/type';

export type ComponentWrapper = (...deps: any[]) => Type<Component>;
