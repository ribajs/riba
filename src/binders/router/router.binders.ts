import { Pjax, Prefetch, GlobalEvent } from './barba/barba';
import { IBinders } from '../../binder.service';
import { viewBinderWrapper } from './view.binder';
import { routeBinderWrapper } from './route.binder';
import { activeOnRouteBinderWrapper } from './active-on-route.binder';

// TODO make to singleton
const dispatcher = new GlobalEvent();
const pjax = new Pjax();
const prefetch = new Prefetch();

const routerBinders: IBinders<any> = {};

const viewBinder = viewBinderWrapper(dispatcher, pjax, prefetch);
const routeBinder = routeBinderWrapper(dispatcher, pjax, prefetch);
const activeOnRouteBinder = activeOnRouteBinderWrapper(dispatcher);

routerBinders[viewBinder.name] = viewBinder.binder;
routerBinders[routeBinder.name] = routeBinder.binder;
routerBinders[activeOnRouteBinder.name] = activeOnRouteBinder.binder;

export { Pjax, Prefetch, GlobalEvent, routerBinders };
