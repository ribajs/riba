import {
    Riba,
} from '../../index';

import {
    dotAdapter,
} from '../../adapters/dot.adapter';

import { callFormatter } from './call.formatter';
import { textBinder } from '../../binders/text.binder';

const riba = new Riba();
riba.module.adapter.regist(dotAdapter);
riba.module.formatter.regist(callFormatter, 'call');
riba.module.binder.regist(textBinder);

interface Model {
    fn?: (arg1: string, arg2: string) => string;
    obj?: {
        name: string;
        fn: () => string;
    };
}

describe('riba.formatters', () => {

    describe('call', () => {
        let model: Model = {};

        beforeEach(() => {
            model = {
                fn: (arg1: string, arg2: string) => {
                    return '' + arg1 + arg2;
                },
            };
        });

        it('calls with arguments', () => {
            expect(riba.formatters).toBeDefined();
            expect(riba.formatters.call).toBeDefined();
            expect(riba.formatters.call.read).toBeDefined();
            if (typeof(riba.formatters.call.read) === 'function') {
                expect(riba.formatters.call.read(model.fn, 'foo', 'bar')).toEqual('foobar');
            }
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
