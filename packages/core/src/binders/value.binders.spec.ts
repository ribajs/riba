import 'mocha';
import 'should';
import * as sinon from 'sinon';

import {
    Riba,
} from '../riba';

import {
    valueBinder,
} from './value.binder';

describe('value', () => {
    let el: Element;
    const riba = new Riba();
    riba.module.binderService.regist(valueBinder, 'value');

    beforeEach(() => {
        el = document.createElement('input');
        // el.setAttribute('rv-value', 'item.val');
    });

    it('unbinds the same bound function', () => {
        let boundFn;

        sinon.stub(el, 'addEventListener').callsFake((event, fn) => {
            boundFn = fn;
        });

        riba.binders.value.bind.call(context, el);

        sinon.stub(el, 'removeEventListener').callsFake((event, fn) => {
            fn.should.equal(boundFn);
        });

        // TODO fix type
        (riba.binders.value as any).unbind.call(context, el);
    });
});