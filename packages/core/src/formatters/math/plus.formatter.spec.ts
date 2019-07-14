import {
    Riba,
} from '../../index';

import { plus } from './plus.formatter';
import { textBinder } from '../../binders/text.binder';

const riba = new Riba();
riba.module.formatter.regist(plus, 'plus');
riba.module.binder.regist(textBinder);

interface IModel {
    obj?: {
        value: number;
    };
}

describe('riba.formatters', () => {

    describe('plus', () => {
        let model: IModel = {};

        beforeEach(() => {
            model = {};
        });

        it('A number should be added to the value of the model correctly', () => {
            model.obj = {
                value: 100,
            };
            const el = document.createElement('div');
            el.setAttribute('rv-text', 'obj.value | plus 200');
            riba.bind(el, model);
            expect(el.textContent).toEqual('300');
        });
    });
});
