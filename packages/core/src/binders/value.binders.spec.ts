import {
    Riba,
} from '../riba';

import {
    valueBinder,
} from './value.binder';

// import * as puppeteer from 'puppeteer';

// import 'jest-environment-puppeteer';

describe('value', () => {
    const riba = new Riba();
    riba.module.binderService.regist(valueBinder, 'value');

    let fragment: DocumentFragment;
    let el: HTMLInputElement;
    let model: any;

    beforeEach(() => {
        model = { value: 'foobar' };
        fragment = document.createDocumentFragment();
        el = document.createElement('input');
        el.setAttribute('rv-value', 'value');
        fragment.appendChild(el);
    });

    it('unbinds the same bound function', () => {
        let boundFn: EventListenerOrEventListenerObject;

        jest.spyOn(el, 'addEventListener').mockImplementation((event, fn) => {
            boundFn = fn;
        });

        const view = riba.bind(fragment, model);

        jest.spyOn(el, 'removeEventListener').mockImplementation((event, fn) => {
            expect(fn).toEqual(boundFn);
        });

        view.unbind();
    });

    it('binds to the model to input', () => {
        const view = riba.bind(fragment, model);
        expect(el.value).toBe(model.value);
    });

    it('reflects changes to the model into the DOM', () => {
        const view = riba.bind(fragment, model);

        expect(el.value).toBe('foobar');

        model.value = 'howdy';
        expect(el.value).toBe('howdy');
    });

    it('reflects changes to the model into the DOM after unbind/bind', () => {
        const view = riba.bind(fragment, model);
        expect(el.value).toBe('foobar');

        view.unbind();
        view.bind();

        model.value = 'howdy';
        expect(el.value).toBe('howdy');
    });

});
