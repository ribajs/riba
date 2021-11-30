"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gulp_1 = __importDefault(require("gulp"));
const theme_1 = require("./includes/theme");
gulp_1.default.task("themes:list:live", () => __awaiter(void 0, void 0, void 0, function* () {
    const themesByEnv = yield (0, theme_1.getStoresThemesByRole)("main");
    for (const env in themesByEnv) {
        const theme = themesByEnv[env][0];
        (0, theme_1.print)(env, theme);
        // console.log(theme);
    }
}));
gulp_1.default.task("themes:list:oldest", () => __awaiter(void 0, void 0, void 0, function* () {
    const themesByEnv = yield (0, theme_1.getOldestEnvTheme)();
    for (const env in themesByEnv) {
        const theme = themesByEnv[env];
        (0, theme_1.print)(env, theme);
    }
}));
gulp_1.default.task("themes:list:youngest", () => __awaiter(void 0, void 0, void 0, function* () {
    const themesByEnv = yield (0, theme_1.getYoungestEnvTheme)();
    for (const env in themesByEnv) {
        const theme = themesByEnv[env];
        (0, theme_1.print)(env, theme);
    }
}));
//# sourceMappingURL=theme.js.map