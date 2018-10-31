import { Pjax, Prefetch, IState } from './barba/barba';

import { IBinders, EventDispatcher } from '@ribajs/core';

import { viewBinderWrapper } from './view.binder';
import { viewStaticBinderWrapper } from './view-static.binder';
import { routeBinderWrapper } from './route.binder';
import { routeClassStarBinderWrapper } from './route-class-star.binder';
import { parentRouteClassStarBinderWrapper } from './parent-route-class-star.binder';
import { routeBackOnStarBinderWrapper } from './route-back-on-star.binder';

const routerBinders: IBinders<any> = {};

const viewBinder = viewBinderWrapper();
const viewStaticBinder = viewStaticBinderWrapper();
const routeBinder = routeBinderWrapper();
const routeClassStarBinder = routeClassStarBinderWrapper();
const parentRouteClassStarBinder = parentRouteClassStarBinderWrapper();
const routeBackOnStarBinder = routeBackOnStarBinderWrapper();

routerBinders[viewBinder.name] = viewBinder.binder;
routerBinders[viewStaticBinder.name] = viewStaticBinder.binder;
routerBinders[routeBinder.name] = routeBinder.binder;
routerBinders[routeClassStarBinder.name] = routeClassStarBinder.binder;
routerBinders[parentRouteClassStarBinder.name] = parentRouteClassStarBinder.binder;
routerBinders[routeBackOnStarBinder.name] = routeBackOnStarBinder.binder;

export { Pjax, Prefetch, EventDispatcher, IState, routerBinders };
