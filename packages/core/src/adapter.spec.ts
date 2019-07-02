import {
    Riba,
    View,
    Binding,
    Adapter,
    IAdapter,
} from './index';

import {
    textBinder,
} from '../src/binders/text.binder';

describe('Functional', () => {
    let data;
    let bindData;
    let el: HTMLUnknownElement;
    let input: HTMLInputElement;
    let originalPrefix: string;
    let adapter: IAdapter;

    const riba = new Riba();
    riba.module.binderService.regist(textBinder);

    beforeEach(() => {
        originalPrefix = riba.prefix;
        riba.prefix = 'data';
        adapter = {
            observe: (obj, keypath, callback) => {
                obj.on(keypath, callback);
            },
            unobserve: (obj, keypath, callback) => {
                obj.off(keypath, callback);
            },
            get: (obj, keypath) => {
                return obj.get(keypath);
            },
            set: (obj, keypath, value) => {
                const attributes = {};
                attributes[keypath] = value;
                obj.set(attributes);
            }
        };

        riba.adapters[':'] = adapter;
        riba.configure({ preloadData: true });

        data = new Data({
            foo: 'bar',
            items: [{ name: 'a' }, { name: 'b' }]
        });

        bindData = { data: data };

        el = document.createElement('div');
        input = document.createElement('input');
        input.setAttribute('type', 'text');
    });

    afterEach(() => {
        riba.prefix = originalPrefix;
    });

    describe('Adapter', () => {
        it('should read the initial value', () => {
            sinon.spy(data, 'get');
            el.setAttribute('data-text', 'data:foo');
            riba.bind(el, bindData);
            should(data.get.calledWith('foo')).be.true();
        });

        it('should read the initial value unless preloadData is false', () => {
            riba.configure({ preloadData: false });
            sinon.spy(data, 'get');
            el.setAttribute('data-value', 'data:foo');
            riba.bind(el, bindData);
            should(data.get.called).be.false();
        });

        it('should subscribe to updates', () => {
            sinon.spy(data, 'on');
            el.setAttribute('data-value', 'data:foo');
            riba.bind(el, bindData);
            data.on.called.should.be.true();
        });
    });

    describe('Binds', () => {
        describe('Text', () => {
            it('should set the text content of the element', () => {
                el.setAttribute('data-text', 'data:foo');
                riba.bind(el, bindData);
                el.textContent.should.equal(data.get('foo'));
            });

            it('should correctly handle HTML in the content', () => {
                el.setAttribute('data-text', 'data:foo');
                var value = '<b>Fail</b>';
                data.set({ foo: value });
                riba.bind(el, bindData);
                el.textContent.should.equal(value);
            });
        });

        describe('HTML', () => {
            it('should set the html content of the element', () => {
                el.setAttribute('data-html', 'data:foo');
                riba.bind(el, bindData);
                el.textContent.should.equal(data.get('foo'));
            });

            it('should correctly handle HTML in the content', () => {
                el.setAttribute('data-html', 'data:foo');
                var value = '<b>Fail</b>';
                data.set({ foo: value });
                riba.bind(el, bindData);
                el.innerHTML.should.equal(value);
            });
        });

        describe('Value', () => {
            it('should set the value of the element', () => {
                input.setAttribute('data-value', 'data:foo');
                riba.bind(input, bindData);
                input.value.should.equal(data.get('foo'));
            });
        });

        describe('Multiple', () => {
            it('should bind a list of multiple elements', () => {
                el.setAttribute('data-html', 'data:foo');
                input.setAttribute('data-value', 'data:foo');
                riba.bind([el, input], bindData);
                el.textContent.should.equal(data.get('foo'));
                input.value.should.equal(data.get('foo'));
            });
        });

        describe('Priority', () => {
            beforeEach(() => {
                riba.binders.a = { bind: () => { } };
                riba.binders.b = { bind: () => { } };

                sinon.spy(riba.binders.a, 'bind');
                sinon.spy(riba.binders.b, 'bind');

                el.setAttribute('data-a', 'data:foo');
                el.setAttribute('data-b', 'data:foo');
            });

            describe('a:10, b:30', () => {
                beforeEach(() => {
                    riba.binders.a.priority = 10;
                    riba.binders.b.priority = 30;
                    riba.bind(el, bindData);
                });

                it('should bind b before a', () => {
                    riba.binders.b.bind.calledBefore(riba.binders.a.bind).should.be.true();
                });
            });

            describe('a:5, b:2', () => {
                beforeEach(() => {
                    riba.binders.a.priority = 5;
                    riba.binders.b.priority = 2;
                    riba.bind(el, bindData);
                });

                it('should bind a before b', () => {
                    riba.binders.a.bind.calledBefore(riba.binders.b.bind).should.be.true();
                });
            });

            describe('a:undefined, b:1', () => {
                beforeEach(() => {
                    riba.binders.b.priority = 1;
                    riba.bind(el, bindData);
                });

                it('should bind b before a', () => {
                    riba.binders.b.bind.calledBefore(riba.binders.a.bind).should.be.true();
                });
            });
        });

        describe('Iteration', () => {
            var listItem;
            beforeEach(() => {
                list = document.createElement('ul');
                el.appendChild(list);
                listItem = document.createElement('li');
                listItem.setAttribute('data-each-item', 'data:items');
                list.appendChild(listItem);
            });

            it('should loop over a collection and create new instances of that element + children', () => {
                el.getElementsByTagName('li').length.should.equal(1);
                riba.bind(el, bindData);
                el.getElementsByTagName('li').length.should.equal(2);
            });

            it('should not fail if the collection being bound to is null', () => {
                data.set({ items: null });
                riba.bind(el, bindData);
                el.getElementsByTagName('li').length.should.equal(0);
            });

            it('should re-loop over the collection and create new instances when the array changes', () => {
                riba.bind(el, bindData);
                el.getElementsByTagName('li').length.should.equal(2);

                var newItems = [{ name: 'a' }, { name: 'b' }, { name: 'c' }];
                data.set({ items: newItems });
                el.getElementsByTagName('li').length.should.equal(3);
            });

            it('should allow binding to the iterated item as well as any parent contexts', () => {
                var span1 = document.createElement('span');
                span1.setAttribute('data-text', 'item.name');
                var span2 = document.createElement('span');
                span2.setAttribute('data-text', 'data:foo');
                listItem.appendChild(span1);
                listItem.appendChild(span2);

                riba.bind(el, bindData);
                el.getElementsByTagName('span')[0].textContent.should.equal('a');
                el.getElementsByTagName('span')[1].textContent.should.equal('bar');
            });

            it('should allow binding to the iterated element directly', () => {
                listItem.setAttribute('data-text', 'item.name');
                listItem.setAttribute('data-class', 'data:foo');
                riba.bind(el, bindData);
                el.getElementsByTagName('li')[0].textContent.should.equal('a');
                el.getElementsByTagName('li')[0].className.should.equal('bar');
            });

            it('should insert items between any surrounding elements', () => {
                var firstItem = document.createElement('li');
                var lastItem = document.createElement('li');
                firstItem.textContent = 'first';
                lastItem.textContent = 'last';
                list.appendChild(lastItem);
                list.insertBefore(firstItem, listItem);
                listItem.setAttribute('data-text', 'item.name');

                riba.bind(el, bindData);

                el.getElementsByTagName('li')[0].textContent.should.equal('first');
                el.getElementsByTagName('li')[1].textContent.should.equal('a');
                el.getElementsByTagName('li')[2].textContent.should.equal('b');
                el.getElementsByTagName('li')[3].textContent.should.equal('last');
            });

            it('should allow binding to the iterated element index', () => {
                listItem.setAttribute('data-index', '%item%');
                riba.bind(el, bindData);
                el.getElementsByTagName('li')[0].getAttribute('index').should.equal('0');
                el.getElementsByTagName('li')[1].getAttribute('index').should.equal('1');
            });


            it('should allow the developer to configure the index attribute available in the iteration', () => {
                listItem.setAttribute('data-index', 'itemIndex');
                listItem.setAttribute('index-property', 'itemIndex');
                riba.bind(el, bindData);
                el.getElementsByTagName('li')[0].getAttribute('index').should.equal('0');
                el.getElementsByTagName('li')[1].getAttribute('index').should.equal('1');
            });
        });
    });

    describe('Updates', () => {
        it('should change the value', () => {
            el.setAttribute('data-text', 'data:foo');
            riba.bind(el, bindData);
            data.set({ foo: 'some new value' });
            el.textContent.should.equal(data.get('foo'));
        });
    });

    describe('Input', () => {
        it('should update the model value', () => {
            input.setAttribute('data-value', 'data:foo');
            riba.bind(input, bindData);
            input.value = 'some new value';
            var event = document.createEvent('HTMLEvents');
            event.initEvent('input', true, true);
            input.dispatchEvent(event);
            data.get('foo').should.equal('some new value');
        });

        it('should allow to change the event listened', () => {
            var event;
            input.setAttribute('data-value', 'data:foo');
            input.setAttribute('event-name', 'blur');
            riba.bind(input, bindData);
            input.value = 'some new value';
            event = document.createEvent('HTMLEvents');
            event.initEvent('input', true, true);
            input.dispatchEvent(event);
            data.get('foo').should.equal('bar');

            event = document.createEvent('HTMLEvents');
            event.initEvent('blur', true, true);
            input.dispatchEvent(event);
            data.get('foo').should.equal('some new value');
        });
    });
});
