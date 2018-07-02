import { Pjax, Prefetch, Dispatcher } from './barba';
import { IBinders, ITwoWayBinder, IOneWayBinder } from '../../binder.service';
import { viewBinder } from './view.binder';
import { routeBinder } from './route.binder';

// TODO make to singleton
const dispatcher = new Dispatcher();
const pjax = new Pjax();
const prefetch = new Prefetch();

export const routerBinders: IBinders<any> = {
  view: viewBinder(dispatcher, pjax, prefetch).binder,
  route: routeBinder(dispatcher, pjax, prefetch).binder,
}