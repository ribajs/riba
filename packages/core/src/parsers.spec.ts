import {
    Riba,
} from './index';

const riba = new Riba();

describe('Parsers', () => {
    describe('parseTemplate()', () => {
        it('tokenizes a text template', () => {
            const template = 'Hello {{ user.name }}, you have {{ user.messages.unread | length }} unread messages.';

            const expected = [
                { type: 0, value: 'Hello ' },
                { type: 1, value: 'user.name' },
                { type: 0, value: ', you have ' },
                { type: 1, value: 'user.messages.unread | length' },
                { type: 0, value: ' unread messages.' },
            ];

            const results = riba.parseTemplate(template, ['{{', '}}']);
            if (!results) {
                throw new Error('No result!');
            }
            expect(results).toHaveLength(5);

            for (let i = 0; i < results.length; i++) {
                if (!results[i]) {
                    throw new Error('results[i] is not defined!');
                }
                expect(results[i].type).toEqual(expected[i].type);
                expect(results[i].value).toEqual(expected[i].value);
            }
        });

        describe('with no binding fragments', () => {
            it('should return undefined', () => {
                const template = 'Hello World!';

                const results = riba.parseTemplate(template, ['{{', '}}']);
                expect(results).toBeNull();
            });
        });

        describe('with only a binding fragment', () => {
            it('should return a single binding token', () => {
                const template = '{{ user.name }}';
                const expected = [{ type: 1, value: 'user.name' }];

                const results = riba.parseTemplate(template, ['{{', '}}']);
                if (!results) {
                    throw new Error('No result!');
                }
                expect(results.length).toEqual(1);

                for (let i = 0; i < results.length; i++) {
                    if (!results[i]) {
                        throw new Error('results[i] is not defined!');
                    }
                    expect(results[i].type).toEqual(expected[i].type);
                    expect(results[i].value).toEqual(expected[i].value);
                }
            });
        });
    });

    describe('parseType', () => {
        it('parses string primitives', () => {
            let token = riba.parseType('\'TEST\'');
            expect(token.type).toEqual(0);
            expect(token.value).toEqual('TEST');

            token = riba.parseType('\'hello\'');
            expect(token.type).toEqual(0);
            expect(token.value).toEqual('hello');

            token = riba.parseType('');
            expect(token.type).toEqual(0);
            // expect(token.value).toEqual('');
        });

        it('parses number primitives', () => {
            let token = riba.parseType('3');
            expect(token.type).toEqual(0);
            expect(token.value).toEqual(3);

            token = riba.parseType('3.14');
            expect(token.type).toEqual(0);
            expect(token.value).toEqual(3.14);
        });

        it('parses boolean primitives', () => {
            let token = riba.parseType('true');
            expect(token.type).toEqual(0);
            expect(token.value).toEqual(true);

            token = riba.parseType('false');
            expect(token.type).toEqual(0);
            expect(token.value).toEqual(false);
        });

        it('parses pathes', () => {
            let token = riba.parseType('path');
            expect(token.type).toEqual(1);
            expect(token.value).toEqual('path');

            token = riba.parseType('dotted.path');
            expect(token.type).toEqual(1);
            expect(token.value).toEqual('dotted.path');

            token = riba.parseType('3a');
            expect(token.type).toEqual(1);
            expect(token.value).toEqual('3a');
        });
    });
});
