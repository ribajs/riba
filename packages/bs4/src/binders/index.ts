import { IModuleBinders } from '@ribajs/core';

import { collapseOnUrlBinderWrapper } from './collapse-on-url.binder';
import { collapseBinderWrapper } from './collapse.binder';
import { dropdownBinderWrapper } from './dropdown.binder';
import { expanOnUrlBinderWrapper } from './expan-on-url.binder';
import { scrollspyStarBinderWrapper } from './scrollspy-star.binder';
import { tooltipBinderWrapper } from './tooltip.binder';

const binders: IModuleBinders<any> = {};

const collapseOnUrlBinder = collapseOnUrlBinderWrapper();
const collapseBinder = collapseBinderWrapper();
const dropdownBinder = dropdownBinderWrapper();
const expanOnUrlBinder = expanOnUrlBinderWrapper();
const scrollspyStarBinder = scrollspyStarBinderWrapper();
const tooltipBinder = tooltipBinderWrapper();

binders[collapseOnUrlBinder.name] = collapseOnUrlBinder.binder;
binders[collapseBinder.name] = collapseBinder.binder;
binders[dropdownBinder.name] = dropdownBinder.binder;
binders[expanOnUrlBinder.name] = expanOnUrlBinder.binder;
binders[scrollspyStarBinder.name] = scrollspyStarBinder.binder;
binders[tooltipBinder.name] = tooltipBinder.binder;

export { binders };
