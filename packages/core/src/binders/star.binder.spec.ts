import {
    Riba,
} from '../index';

import {
    starBinder,
} from './star.binder';

const riba = new Riba();
riba.module.binderService.regist(starBinder);

describe('riba.binders', () => {
    let element: HTMLDivElement;
    let fragment: DocumentFragment;
    let model: any = {};

    beforeEach(() => {
        fragment = document.createDocumentFragment();
        element = document.createElement('div');
        fragment.appendChild(element);

        model = {
            barString: 'bar',
        };
    });

    describe('*', () => {
        it('Adds or removes the class name passed as star parameter', () => {
            element.className = 'foobar';
            element.setAttribute('rv-foo', 'barString');

            expect(element.getAttribute('foo')).toEqual(null);

            riba.bind(fragment, model);

            expect(element.getAttribute('foo')).toEqual('bar');
        });
    });

});
