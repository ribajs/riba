"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultConfiguration = {
    language: 'ts',
    collection: '@ribajs/schematics',
    sourceRoot: 'src',
    templateEngine: 'html',
    styleLanguage: 'scss',
    component: {
        path: 'components',
        flat: false,
    },
    binder: {
        path: 'binders',
        flat: true,
    },
    formatter: {
        path: 'formatters',
        flat: true,
    },
    service: {
        path: 'services',
        flat: true,
    },
};
