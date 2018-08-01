import { Pjax, Prefetch, GlobalEvent } from './barba/barba';
import { IBinders } from '../../binder.service';
import { viewBinderWrapper } from './view.binder';
import { viewStaticBinderWrapper } from './view-static.binder';
import { routeBinderWrapper } from './route.binder';
import { onRouteStarBinderWrapper } from './on-route-star.binder';

const dispatcher = new GlobalEvent();
const prefetch = new Prefetch();

const routerBinders: IBinders<any> = {};

const viewBinder = viewBinderWrapper(dispatcher, prefetch);
const viewStaticBinder = viewStaticBinderWrapper();
const routeBinder = routeBinderWrapper(dispatcher, prefetch);
const activeOnRouteBinder = onRouteStarBinderWrapper(dispatcher);

routerBinders[viewBinder.name] = viewBinder.binder;
routerBinders[viewStaticBinder.name] = viewStaticBinder.binder;
routerBinders[routeBinder.name] = routeBinder.binder;
routerBinders[activeOnRouteBinder.name] = activeOnRouteBinder.binder;

export { Pjax, Prefetch, GlobalEvent, routerBinders };
