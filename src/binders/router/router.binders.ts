import { Pjax, Prefetch, GlobalEvent } from './barba/barba';
import { IBinders } from '../../binder.service';
import { viewBinderWrapper } from './view.binder';
import { routeAppendBinderOnStarWrapper } from './route-append-on-star.binder';
import { viewStaticBinderWrapper } from './view-static.binder';
import { routeBinderWrapper } from './route.binder';
import { routeClassStarBinderWrapper } from './route-class-star.binder';
import { parentRouteClassStarBinderWrapper } from './parent-route-class-star.binder';
import { routeBackOnStarBinderWrapper } from './route-back-on-star.binder';

const dispatcher = new GlobalEvent();
const prefetch = new Prefetch();

const routerBinders: IBinders<any> = {};

const viewBinder = viewBinderWrapper(dispatcher, prefetch);
const routeAppendOnStarBinder = routeAppendBinderOnStarWrapper();
const viewStaticBinder = viewStaticBinderWrapper();
const routeBinder = routeBinderWrapper(dispatcher, prefetch);
const routeClassStarBinder = routeClassStarBinderWrapper(dispatcher);
const parentRouteClassStarBinder = parentRouteClassStarBinderWrapper(dispatcher);
const routeBackOnStarBinder = routeBackOnStarBinderWrapper();

routerBinders[viewBinder.name] = viewBinder.binder;
routerBinders[routeAppendOnStarBinder.name] = routeAppendOnStarBinder.binder;
routerBinders[viewStaticBinder.name] = viewStaticBinder.binder;
routerBinders[routeBinder.name] = routeBinder.binder;
routerBinders[routeClassStarBinder.name] = routeClassStarBinder.binder;
routerBinders[parentRouteClassStarBinder.name] = parentRouteClassStarBinder.binder;
routerBinders[routeBackOnStarBinder.name] = routeBackOnStarBinder.binder;

export { Pjax, Prefetch, GlobalEvent, routerBinders };
