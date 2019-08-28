import 'jest-extended';

import {
    Riba,
    View,
    Binding,
} from './index';

import {
    Data,
} from '../spec/lib/moch.data';

import {
    textBinder,
} from '../src/binders/text.binder';

import {
    htmlBinder,
} from '../src/binders/html.binder';

import {
    valueBinder,
} from '../src/binders/value.binder';

import {
    eachStarBinder,
} from '../src/binders/each-item.binder';

import {
    classBinder,
} from '../src/binders/class.binder';

import { IFormatter, IAdapter } from './interfaces';

const riba = new Riba();
riba.module.binder.regist(textBinder);
riba.module.binder.regist(htmlBinder);
riba.module.binder.regist(valueBinder);
riba.module.binder.regist(eachStarBinder);
riba.module.binder.regist(classBinder);

describe('riba.Binding', () => {
    let model: object;
    let el: HTMLElement;
    let view: View;
    let binding: Binding;
    let originalPrefix: string;
    let adapter: IAdapter;
    let routineFn;

    beforeEach(() => {
        originalPrefix = riba.prefix;
        riba.prefix = 'data';
        adapter = riba.adapters['.'];

        el = document.createElement('div');
        el.setAttribute('data-text', 'obj.name');

        view = riba.bind(el, { obj: { name: 'test' } });
        binding = view.bindings[0] as Binding;
        model = binding.model;
    });

    afterEach(() => {
        riba.prefix = originalPrefix;
    });

    it('gets assigned the proper binder routine matching the identifier', () => {
        routineFn = binding.binder.routine;
        expect(routineFn).toEqual(riba.binders.text.routine);
    });

    describe('when bind to non configurable properties', () => {
        let data: any;
        beforeEach(() => {
            data = {
                name: 'x',
                items: [],
            };
            Object.defineProperty(data, 'name', {
                enumerable: true,
                configurable: false,
                writable: true,
                value: 'y',
            });
            el.setAttribute('data-show', 'obj.items.length');
        });

        it('does not throw', () => {
            expect(() => {
                riba.bind(el, { obj: data });
            }).not.toThrow();
        });

    });

    describe('with formatters', () => {
        let valueInput: HTMLInputElement;

        beforeEach(() => {
            const awesomeFormatter = {
                name: 'awesome',
                read: (value) => 'awesome ' + value,
            } as IFormatter;

            const totallyFormatter = {
                name: 'totally',
                read: (value, prefix) => prefix + ' totally ' + value,
            } as IFormatter;

            const placeholderFormatter = {
                name: 'and',
                read: (value, affix) => value + affix,
            } as IFormatter;

            riba.module.formatter.regist(awesomeFormatter);
            riba.module.formatter.regist(totallyFormatter);
            riba.module.formatter.regist(placeholderFormatter, 'and');
            riba.module.formatter.regist(placeholderFormatter, 'radical');
            riba.module.formatter.regist(placeholderFormatter, 'totally');
        });

        it('register all formatters', () => {

            valueInput = document.createElement('input');
            valueInput.setAttribute('type', 'text');
            valueInput.setAttribute('data-value', 'obj.name | awesome | radical | totally');

            view = riba.bind(valueInput, { obj: { name: 'nothing' } });
            binding = view.bindings[0] as Binding;
            expect(binding.formatters).toEqual(['awesome', 'radical', 'totally']);
        });

        it('allows arguments with pipes', () => {

            valueInput = document.createElement('input');
            valueInput.setAttribute('type', 'text');
            valueInput.setAttribute('data-value', `obj.name | awesome | totally 'arg | with || pipes' 'and more args' | and 'others formatters' with 'pi||pes'`);

            view = riba.bind(valueInput, { obj: { name: 'nothing' } });
            binding = view.bindings[0] as Binding;

            expect(binding.formatters).toEqual(['awesome', `totally 'arg | with || pipes' 'and more args'`, `and 'others formatters' with 'pi||pes'`]);
        });
    });

    describe('bind()', () => {
        it('subscribes to the model for changes via the adapter', () => {
            jest.spyOn(adapter, 'observe');
            binding.bind();
            expect(adapter.observe).toHaveBeenCalledWith(model, 'name', binding);
        });

        it(`calls the binder's bind method if one exists`, () => {
            expect(() => {
                binding.bind();
            }).not.toThrow();

            binding.binder.bind = (_: HTMLElement) => { return; };
            jest.spyOn(binding.binder, 'bind');

            binding.bind();
            expect(binding.binder.bind).toHaveBeenCalled();
        });

        describe('with preloadData set to true', () => {
            beforeEach(() => {
                riba.preloadData = true;
            });

            it('sets the initial value', () => {
                jest.spyOn(binding, 'set');
                binding.bind();
                expect(binding.set).toHaveBeenCalledWith('test');
            });
        });

    });

    describe('unbind()', () => {
        describe('without a binder.unbind defined', () => {
            it('should not throw an error', () => {
                expect(() => {
                    binding.unbind();
                }).not.toThrow();
            });
        });

        describe('with a binder.unbind defined', () => {
            beforeEach(() => {
                binding.binder.unbind = () => { /**/ };
            });

            it('should not throw an error', () => {
                expect(() => {
                    binding.unbind();
                }).not.toThrow();
            });

            it(`calls the binder's unbind method`, () => {
                jest.spyOn(binding.binder, 'unbind');
                binding.unbind();
                expect(binding.binder.unbind).toHaveBeenCalled();
            });
        });
    });

    describe('set()', () => {
        it('performs the binding routine with the supplied value', () => {
            routineFn = jest.spyOn(binding.binder, 'routine');

            binding.set('sweater');
            expect(routineFn).toHaveBeenCalledWith(el, 'sweater');
        });

        it('applies any formatters to the value before performing the routine', () => {

            view.options.formatters.awesome = {
                name: 'awesome',
                read(value: string) { return 'awesome ' + value; },
            };

            if (binding.formatters) {
                binding.formatters.push('awesome');
            }
            binding.set('sweater');

            expect(binding.binder.routine).toHaveBeenCalledWith(el, 'awesome sweater');
        });
    });

    describe('publish()', () => {
        let numberInput: HTMLInputElement;
        it(`should publish the value of a number input`, () => {
            numberInput = document.createElement('input');
            numberInput.setAttribute('type', 'number');
            numberInput.setAttribute('data-value', 'obj.num');

            view = riba.bind(numberInput, { obj: { num: 42 } });
            binding = view.bindings[0];
            model = binding.model;

            numberInput.value = '42';

            jest.spyOn(adapter, 'set');
            binding.publish();
            expect(adapter.set).toHaveBeenCalledWith(model, 'num', '42');
        });
    });

    describe('publishTwoWay()', () => {
        let numberInput;
        let valueInput;
        it('applies a two-way read formatter to function same as a single-way', () => {
            const awesomeFormatter = {
                read: (value) => 'awesome ' + value,
            } as IFormatter;

            riba.module.formatter.regist(awesomeFormatter, 'awesome');

            routineFn = jest.spyOn(binding.binder, 'routine');

            if (!binding.formatters) {
                throw new Error('Formatters not set!');
            }

            binding.formatters.push('awesome');

            binding.set('sweater');
            expect(routineFn).toHaveBeenCalledWith(el, 'awesome sweater');
        });

        it(`should publish the value of a number input`, () => {
            // TODO remove any
            (riba.formatters.awesome as any) = {
                publish: (value: string) => 'awesome ' + value,
            };

            numberInput = document.createElement('input');
            numberInput.setAttribute('type', 'number');
            numberInput.setAttribute('data-value', 'obj.num | awesome');

            view = riba.bind(numberInput, { obj: { num: 42 } });
            binding = view.bindings[0] as Binding;
            model = binding.model;

            numberInput.value = '42';

            binding.publish();
            expect(adapter.set).toHaveBeenCalledWith(model, 'num', 'awesome 42');
        });

        it(`should format a value in both directions`, () => {
            // TODO remove any
            (riba.formatters.awesome as any) = {
                publish: (value: string) => 'awesome ' + value,
                read: (value: string) => value + ' is awesome',
            };

            jest.spyOn(binding.binder, 'routine');

            valueInput = document.createElement('input');
            valueInput.setAttribute('type', 'text');
            valueInput.setAttribute('data-value', 'obj.name | awesome');

            view = riba.bind(valueInput, { obj: { name: 'nothing' } });
            binding = view.bindings[0];
            model = binding.model;

            jest.spyOn(binding.binder, 'routine');

            valueInput.value = 'charles';
            binding.publish();
            expect(adapter.set).toHaveBeenCalledWith(model, 'name', 'awesome charles');

            binding.set('fred');
            expect(binding.binder.routine).toHaveBeenCalledWith(valueInput, 'fred is awesome');
        });

        it(`should resolve formatter arguments to their values`, () => {
            (riba.formatters.withArguments as IFormatter) = {
                name: 'withArguments',
                publish: (value, arg1, arg2) => {
                    return value + ':' + arg1 + ':' + arg2;
                },
                read: (value, arg1, arg2) => {
                    return value.replace(':' + arg1 + ':' + arg2, '');
                },
            };

            valueInput = document.createElement('input');
            valueInput.setAttribute('type', 'text');
            valueInput.setAttribute('data-value', `obj.name | withArguments config.age 'male'`);

            view = riba.bind(valueInput, {
                obj: {
                    name: 'nothing',
                },
                config: {
                    age: 50,
                },
            });

            binding = view.bindings[0] as Binding;
            model = binding.model;

            valueInput.value = 'bobby';
            binding.publish();
            expect(adapter.set).toBeCalledWith(model, 'name', 'bobby:50:male');

            expect(valueInput.value).toEqual('bobby');

            binding.set('andy:50:male');
            expect(binding.binder.routine).toBeCalledWith(valueInput, 'andy');
        });

        it(`should resolve formatter arguments correctly with multiple formatters`, () => {
            (riba.formatters.wrap as IFormatter ) = {
                name: 'wrap',
                publish: (value: string, arg1: string, arg2: string) => {
                    return arg1 + value + arg2;
                },
                read: (value: string, arg1: string, arg2: string) => {
                    return value.replace(arg1, '').replace(arg2, '');
                },
            };

            (riba.formatters.saveAsCase as IFormatter) = {
                name: 'saveAsCase',
                publish: (value, typeCase) => {
                    return value['to' + typeCase + 'Case']();
                },
                read: (value, typeCase) => {
                    return value[typeCase === 'Upper' ? 'toLowerCase' : 'toUpperCase']();
                },
            };

            valueInput = document.createElement('input');
            valueInput.setAttribute('type', 'text');
            valueInput.setAttribute(
                'data-value',
                `obj.name | saveAsCase config.typeCase | wrap config.curly '}' | wrap config.square ']' | wrap config.paren ')'`,
            );

            view = riba.bind(valueInput, {
                obj: {
                    name: 'nothing',
                },
                config: {
                    paren: '(',
                    square: '[',
                    curly: '{',
                    typeCase: 'Upper',
                },
            });

            binding = view.bindings[0] as Binding;
            model = binding.model;

            jest.spyOn(binding.binder, 'routine');

            valueInput.value = 'bobby';
            binding.publish();
            expect(adapter.set).toBeCalledWith(model, 'name', '{[(BOBBY)]}');

            expect(valueInput.value).toEqual('bobby');

            binding.set('{[(ANDY)]}');
            expect(binding.binder.routine).toBeCalledWith(valueInput, 'andy');
        });

        it(`should not fail or format if the specified binding function doesn't exist`, () => {
            (riba.formatters.awesome as any) = {};
            valueInput = document.createElement('input');
            valueInput.setAttribute('type', 'text');
            valueInput.setAttribute('data-value', 'obj.name | awesome');

            view = riba.bind(valueInput, { obj: { name: 'nothing' } });
            binding = view.bindings[0] as Binding;
            model = binding.model;

            jest.spyOn(binding.binder, 'routine');

            valueInput.value = 'charles';
            binding.publish();
            expect(adapter.set).toBeCalledWith(model, 'name', 'charles');

            binding.set('fred');
            expect(binding.binder.routine).toBeCalledWith(valueInput, 'fred');
        });

        it(`should apply read binders left to right, and write binders right to left`, () => {
            (riba.formatters.totally as IFormatter) = {
                name: 'totally',
                publish: (value) => value + ' totally',
                read: (value) => value + ' totally',
            };

            (riba.formatters.awesome as IFormatter) = {
                name: 'awesome',
                publish: (value) => value + ' is awesome',
                read: (value) => value + ' is awesome',
            };

            valueInput = document.createElement('input');
            valueInput.setAttribute('type', 'text');
            valueInput.setAttribute('data-value', 'obj.name | awesome | totally');

            view = riba.bind(valueInput, { obj: { name: 'nothing' } });
            binding = view.bindings[0] as Binding;
            model = binding.model;

            jest.spyOn(binding.binder, 'routine');

            binding.set('fred');
            expect(binding.binder.routine).toBeCalledWith(valueInput, 'fred is awesome totally');

            valueInput.value = 'fred';
            binding.publish();
            expect(adapter.set).toBeCalledWith(model, 'name', 'fred totally is awesome');
        });

        it(`binders in a chain should be skipped if they're not there`, () => {
            (riba.formatters.totally as IFormatter) = {
                name: 'totally',
                publish: (value) => value + ' totally',
                read: (value) => value + ' totally',
            };

            (riba.formatters.radical as IFormatter) = {
                name: 'radical',
                publish: (value) => value + ' is radical',
            };

            (riba.formatters.awesome as IFormatter) = {
                name: 'awesome',
                read: (value) => value + ' is awesome',
            };

            valueInput = document.createElement('input');
            valueInput.setAttribute('type', 'text');
            valueInput.setAttribute('data-value', 'obj.name | awesome | radical | totally');

            view = riba.bind(valueInput, { obj: { name: 'nothing' } });
            binding = view.bindings[0] as Binding;
            model = binding.model;

            jest.spyOn(binding.binder, 'routine');

            expect(binding.binder.routine).toHaveBeenCalledWith(valueInput, 'nothing is awesome totally');

            binding.set('fred');
            expect(binding.binder.routine).toHaveBeenCalledWith(valueInput, 'fred is awesome totally');

            valueInput.value = 'fred';
            binding.publish();
            expect(adapter.set).toHaveBeenCalledWith(model, 'name', 'fred totally is radical');
        });
    });

    describe('formattedValue()', () => {
        it('applies the current formatters on the supplied value', () => {
            view.options.formatters.awesome = {
                name: 'awesome',
                read(value) {
                    return 'awesome ' + value;
                },
            };
            if (!binding.formatters) {
                throw new Error('Formatters not set!');
            }
            binding.formatters.push('awesome');
            expect(binding.formattedValue('hat')).toEqual('awesome hat');
        });

        describe('with a multi-argument formatter string', () => {
            beforeEach(() => {
                view.options.formatters.awesome = {
                    name: 'awesome',
                    read(value: string, prefix: string) {
                        return prefix + ' awesome ' + value;
                    },
                };

                if (!binding.formatters) {
                    throw new Error('Formatters not set!');
                }
                binding.formatters.push(`awesome 'super'`);
            });

            it('applies the formatter with arguments', () => {
                expect(binding.formattedValue('jacket')).toEqual('super awesome jacket');
            });
        });

        describe('with a formatter string with pipes in argument', () => {
            beforeEach(() => {

                view.options.formatters.totally = {
                    name: 'totally',
                    read(value, prefix) {
                        return prefix + ' totally ' + value;
                    },
                };

                if (!binding.formatters) {
                    throw new Error('Formatters not set!');
                }
                binding.formatters.push(`totally 'arg | with || pipes'`);
            });

            it('applies the formatter with arguments with pipes', () => {
                expect(binding.formattedValue('jacket')).toEqual('arg | with || pipes totally jacket');
            });
        });
    });

    describe('getValue()', () => {
        it('should use binder.getValue() if present', () => {
            binding.binder.getValue = () => {
                return 'foo';
            };

            expect(binding.getValue(el)).toEqual('foo');
        });

        it('binder.getValue() should have access to passed element', () => {
            binding.binder.getValue = (_el) => {
                return _el.dataset.foo;
            };

            el.dataset.foo = 'bar';
            expect(binding.getValue(el)).toEqual('bar');
        });

        it('binder.getValue() should have access to binding', () => {
            binding.binder.getValue = function() {
                return (this as any).foo;
            };

            (binding as any).foo = 'bar';
            expect(binding.getValue(el)).toEqual('bar');
        });
    });
});

describe('Functional', () => {
    let data: Data;
    let bindData: { data: Data };
    let el: HTMLUnknownElement;
    let input: HTMLInputElement;
    let originalPrefix: string;
    let adapter: IAdapter;

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
                const attributes: {[keypath: string]: any} = {};
                attributes[keypath] = value;
                obj.set(attributes);
            },
        };

        riba.adapters[':'] = adapter;
        riba.configure({ preloadData: true });

        data = new Data({
            foo: 'bar',
            items: [{ name: 'a' }, { name: 'b' }],
        });

        bindData = { data };

        el = document.createElement('div');
        input = document.createElement('input');
        input.setAttribute('type', 'text');
    });

    afterEach(() => {
        riba.prefix = originalPrefix;
    });

    describe('Binds', () => {
        describe('Text', () => {
            it('should set the text content of the element', () => {
                el.setAttribute('data-text', 'data:foo');
                riba.bind(el, bindData);
                expect(el.textContent).toEqual(data.get('foo'));
            });

            it('should correctly handle HTML in the content', () => {
                el.setAttribute('data-text', 'data:foo');
                const value = '<b>Fail</b>';
                data.set({ foo: value });
                riba.bind(el, bindData);
                expect(el.textContent).toEqual(value);
            });
        });

        describe('HTML', () => {
            it('should set the html content of the element', () => {
                el.setAttribute('data-html', 'data:foo');
                riba.bind(el, bindData);
                expect(el.textContent).toEqual(data.get('foo'));
            });

            it('should correctly handle HTML in the content', () => {
                el.setAttribute('data-html', 'data:foo');
                const value = '<b>Fail</b>';
                data.set({ foo: value });
                riba.bind(el, bindData);
                expect(el.innerHTML).toEqual(value);
            });
        });

        describe('Value', () => {
            it('should set the value of the element', () => {
                input.setAttribute('data-value', 'data:foo');
                riba.bind(input, bindData);
                expect(input.value).toEqual(data.get('foo'));
            });
        });

        describe('Multiple', () => {
            it('should bind a list of multiple elements', () => {
                el.setAttribute('data-html', 'data:foo');
                input.setAttribute('data-value', 'data:foo');
                riba.bind([el, input], bindData);
                expect(el.textContent).toEqual(data.get('foo'));
                expect(input.value).toEqual(data.get('foo'));
            });
        });

        describe('Priority', () => {
            let mockA: jest.Mock<any, any>;
            let mockB: jest.Mock<any, any>;
            beforeEach(() => {
                mockA = jest.fn();
                mockB = jest.fn();

                riba.binders.a = { name: 'a', bind: () => mockA(), routine: () => {/**/} };
                riba.binders.b = { name: 'b', bind: () => mockB(), routine: () => {/**/}  };

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
                    expect(mockB).toHaveBeenCalledBefore(mockA);
                });
            });

            describe('a:5, b:2', () => {
                beforeEach(() => {
                    riba.binders.a.priority = 5;
                    riba.binders.b.priority = 2;
                    riba.bind(el, bindData);
                });

                it('should bind a before b', () => {
                    expect(mockA).toHaveBeenCalledBefore(mockB);
                });
            });

            describe('a:undefined, b:1', () => {
                beforeEach(() => {
                    riba.binders.b.priority = 1;
                    riba.bind(el, bindData);
                });

                it('should bind b before a', () => {
                    expect(mockB).toHaveBeenCalledBefore(mockA);
                });
            });
        });

        describe('Iteration', () => {
            let listItem: HTMLLIElement;
            let list: HTMLUListElement;
            beforeEach(() => {
                list = document.createElement('ul');
                el.appendChild(list);
                listItem = document.createElement('li');
                listItem.setAttribute('data-each-item', 'data:items');
                list.appendChild(listItem);
            });

            it('should loop over a collection and create new instances of that element + children', () => {
                expect(el.getElementsByTagName('li').length).toEqual(1);
                riba.bind(el, bindData);
                expect(el.getElementsByTagName('li').length).toEqual(2);
            });

            it('should not fail if the collection being bound to is null', () => {
                data.set({ items: null });
                riba.bind(el, bindData);
                expect(el.getElementsByTagName('li').length).toEqual(0);
            });

            it('should re-loop over the collection and create new instances when the array changes', () => {
                riba.bind(el, bindData);
                expect(el.getElementsByTagName('li').length).toEqual(2);

                const newItems = [{ name: 'a' }, { name: 'b' }, { name: 'c' }];
                data.set({ items: newItems });
                expect(el.getElementsByTagName('li').length).toEqual(3);
            });

            it('should allow binding to the iterated item as well as any parent contexts', () => {
                const span1 = document.createElement('span');
                span1.setAttribute('data-text', 'item.name');
                const span2 = document.createElement('span');
                span2.setAttribute('data-text', 'data:foo');
                listItem.appendChild(span1);
                listItem.appendChild(span2);

                riba.bind(el, bindData);
                expect(el.getElementsByTagName('span')[0].textContent).toEqual('a');
                expect(el.getElementsByTagName('span')[1].textContent).toEqual('bar');
            });

            it('should allow binding to the iterated element directly', () => {
                listItem.setAttribute('data-text', 'item.name');
                listItem.setAttribute('data-class', 'data:foo');
                riba.bind(el, bindData);
                expect(el.getElementsByTagName('li')[0].textContent).toEqual('a');
                expect(el.getElementsByTagName('li')[0].className).toEqual('bar');
            });

            it('should insert items between any surrounding elements', () => {
                const firstItem = document.createElement('li');
                const lastItem = document.createElement('li');
                firstItem.textContent = 'first';
                lastItem.textContent = 'last';
                list.appendChild(lastItem);
                list.insertBefore(firstItem, listItem);
                listItem.setAttribute('data-text', 'item.name');

                riba.bind(el, bindData);

                expect(el.getElementsByTagName('li')[0].textContent).toEqual('first');
                expect(el.getElementsByTagName('li')[1].textContent).toEqual('a');
                expect(el.getElementsByTagName('li')[2].textContent).toEqual('b');
                expect(el.getElementsByTagName('li')[3].textContent).toEqual('last');
            });

            it('should allow binding to the iterated element index', () => {
                listItem.setAttribute('data-index', '%item%');
                riba.bind(el, bindData);
                expect(el.getElementsByTagName('li')[0].getAttribute('index')).toEqual('0');
                expect(el.getElementsByTagName('li')[1].getAttribute('index')).toEqual('1');
            });

            it('should allow the developer to configure the index attribute available in the iteration', () => {
                listItem.setAttribute('data-index', 'itemIndex');
                listItem.setAttribute('index-property', 'itemIndex');
                riba.bind(el, bindData);
                expect(el.getElementsByTagName('li')[0].getAttribute('index')).toEqual('0');
                expect(el.getElementsByTagName('li')[1].getAttribute('index')).toEqual('1');
            });
        });
    });

    describe('Updates', () => {
        it('should change the value', () => {
            el.setAttribute('data-text', 'data:foo');
            riba.bind(el, bindData);
            data.set({ foo: 'some new value' });
            expect(el.textContent).toEqual(data.get('foo'));
        });
    });

    describe('Input', () => {
        it('should update the model value', () => {
            input.setAttribute('data-value', 'data:foo');
            riba.bind(input, bindData);
            input.value = 'some new value';
            const event = document.createEvent('HTMLEvents');
            event.initEvent('input', true, true);
            input.dispatchEvent(event);
            expect(data.get('foo')).toEqual('some new value');
        });

        it('should allow to change the event listened', () => {
            let event;
            input.setAttribute('data-value', 'data:foo');
            input.setAttribute('event-name', 'blur');
            riba.bind(input, bindData);
            input.value = 'some new value';
            event = document.createEvent('HTMLEvents');
            event.initEvent('input', true, true);
            input.dispatchEvent(event);
            expect(data.get('foo')).toEqual('bar');

            event = document.createEvent('HTMLEvents');
            event.initEvent('blur', true, true);
            input.dispatchEvent(event);
            expect(data.get('foo')).toEqual('some new value');
        });
    });
});
