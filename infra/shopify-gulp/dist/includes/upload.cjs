"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getDownloadFileUrl = exports.uploadFile = void 0;
const gulp_util_1 = __importDefault(require("gulp-util"));
const path_1 = __importDefault(require("path"));
const config_cjs_1 = require("./config.cjs");
const bithucket = __importStar(require("./bitbucket.cjs"));
const github = __importStar(require("./github.cjs"));
const uploadFile = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    const releaseConfig = (0, config_cjs_1.getYamlConfig)(config_cjs_1.config.releaseConfig);
    const filename = path_1.default.basename(filePath);
    if (releaseConfig === null || releaseConfig === void 0 ? void 0 : releaseConfig.bitbucket) {
        return bithucket.uploadFile(filePath);
    }
    if (releaseConfig === null || releaseConfig === void 0 ? void 0 : releaseConfig.github) {
        return github.uploadFile(filePath);
    }
    gulp_util_1.default.log(gulp_util_1.default.colors.yellow(`The config file "${config_cjs_1.config.releaseConfig}" does not exist or is invalid, skip upload!\n` +
        `Please upload the theme file "${filename}" by hand to Shopify.\n` +
        `If you want to automatically deploy the theme to Shopify create / fix the config file in the root of you project.`));
    return null;
});
exports.uploadFile = uploadFile;
const getDownloadFileUrl = (filename) => __awaiter(void 0, void 0, void 0, function* () {
    const releaseConfig = (0, config_cjs_1.getYamlConfig)(config_cjs_1.config.releaseConfig);
    if (releaseConfig === null || releaseConfig === void 0 ? void 0 : releaseConfig.bitbucket) {
        return bithucket.getDownloadFileUrl(filename);
    }
    if (releaseConfig === null || releaseConfig === void 0 ? void 0 : releaseConfig.github) {
        return github.getDownloadFileUrl(filename);
    }
    gulp_util_1.default.log(gulp_util_1.default.colors.yellow(`The config file "${config_cjs_1.config.releaseConfig}" does not exist or is invalid, skip get download url!`));
    return null;
});
exports.getDownloadFileUrl = getDownloadFileUrl;
//# sourceMappingURL=upload.cjs.map