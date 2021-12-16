"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = exports.session = exports.theme = exports.app = void 0;
const dotenv = require("dotenv");
dotenv.config();
const path_1 = require("path");
const findRoot = require("find-root");
const config_1 = require("@nestjs/config");
const THEME_ACTIVE = process.env.THEME_ACTIVE || 'nest-riba-ssr-theme';
const ROOT = findRoot(process.cwd());
const PACKAGES = (0, path_1.resolve)(ROOT, '..');
const THEME_DIR = process.env.THEME_DIR || (0, path_1.resolve)(PACKAGES, THEME_ACTIVE);
exports.app = {
    root: ROOT,
    port: Number(process.env.PORT) || 3000,
    environment: process.env.NODE_ENV === 'development' ? 'development' : 'production',
};
exports.theme = {
    active: THEME_ACTIVE,
    themeDir: THEME_DIR,
};
exports.session = {
    secret: process.env.SESSION_SECRET || 'Set your own string here!',
    resave: false,
    saveUninitialized: true,
    proxy: true,
    cookie: {
        maxAge: 60 * 60 * 24 * 1000,
        secure: true,
        sameSite: 'none',
    },
};
exports.appConfig = (0, config_1.registerAs)('app', () => (Object.assign({}, exports.app)));
//# sourceMappingURL=config.js.map