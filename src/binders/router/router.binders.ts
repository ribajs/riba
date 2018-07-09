import { Pjax, Prefetch, GlobalEvent } from './barba/barba';
import { IBinders } from '../../binder.service';
import { viewBinder } from './view.binder';
import { routeBinder } from './route.binder';

// TODO make to singleton
const dispatcher = new GlobalEvent();
const pjax = new Pjax();
const prefetch = new Prefetch();

const routerBinders: IBinders<any> = {};

const viewBinderWrapper = viewBinder(dispatcher, pjax, prefetch);
const routeBinderWrapper = routeBinder(dispatcher, pjax, prefetch);

routerBinders[viewBinderWrapper.name] = viewBinderWrapper.binder;
routerBinders[routeBinderWrapper.name] = routeBinderWrapper.binder;

export { Pjax, Prefetch, GlobalEvent, routerBinders };