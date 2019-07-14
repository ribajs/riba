import {
    Riba,
} from '../../index';

import { call } from './call.formatter';
import { textBinder } from '../../binders/text.binder';

const riba = new Riba();
riba.module.formatter.regist(call, 'call');
riba.module.binder.regist(textBinder);

interface IModel {
    fn?: (arg1: string, arg2: string) => string;
    obj?: {
        name: string;
        fn: () => string;
    };
}

describe('riba.formatters', () => {

    describe('call', () => {
        let model: IModel = {};

        beforeEach(() => {
            model = {
                fn: (arg1: string, arg2: string) => {
                    return '' + arg1 + arg2;
                },
            };
        });

        it('calls with arguments', () => {
            expect(riba.formatters.call(model.fn, 'foo', 'bar')).toEqual('foobar');
        });

        it('calls with the model as context', () => {
            model.obj = {
                name: 'foo',
                fn() {
                    return this.name;
                },
            };
            const el = document.createElement('div');
            el.setAttribute('rv-text', 'obj.fn | call');
            riba.bind(el, model);
            expect(el.textContent).toEqual('foo');
        });
    });
});
