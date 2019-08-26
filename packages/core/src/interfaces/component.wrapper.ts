import { Component } from '../components';

export type ComponentWrapper = (...deps: any[]) => typeof Component;
