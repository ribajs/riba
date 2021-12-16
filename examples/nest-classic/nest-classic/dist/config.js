"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moduleConfig = exports.session = exports.theme = exports.app = void 0;
const YAML = require("yaml");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const path_1 = require("path");
const findRoot = require("find-root");
const THEME_ACTIVE = process.env.THEME_ACTIVE || 'nest-classic-theme';
const ROOT = findRoot(process.cwd());
const PACKAGES = (0, path_1.resolve)(ROOT, '..');
const THEME_DIR = (0, path_1.resolve)(PACKAGES, THEME_ACTIVE);
const THEME = YAML.parse(fs.readFileSync((0, path_1.resolve)(THEME_DIR, 'config', 'theme.yaml'), 'utf8'));
exports.app = {
    root: ROOT,
    port: Number(process.env.PORT) || 3000,
    environment: process.env.NODE_ENV === 'development' ? 'development' : 'production',
};
exports.theme = Object.assign(Object.assign({}, THEME), { active: THEME_ACTIVE, assetsDir: (0, path_1.resolve)(THEME_DIR, THEME.assetsDir), viewsDir: (0, path_1.resolve)(THEME_DIR, THEME.viewsDir) });
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
const moduleConfig = () => ({
    app: exports.app,
    theme: exports.theme,
    session: exports.session,
});
exports.moduleConfig = moduleConfig;
//# sourceMappingURL=config.js.map