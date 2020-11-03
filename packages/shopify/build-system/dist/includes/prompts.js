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
exports.promptYesNo = exports.promptInput = void 0;
const prompt_1 = __importDefault(require("prompt"));
const messages_1 = __importDefault(require("./messages"));
exports.promptInput = (description, defaultName, name = "value", color = "default") => __awaiter(void 0, void 0, void 0, function* () {
    description = messages_1.default.colorize(description, color);
    const property = {
        name,
        description,
        message: "$",
        type: "string",
        required: true,
        default: defaultName,
    };
    return new Promise((resolve, reject) => {
        prompt_1.default.start();
        prompt_1.default.get(property, (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result[name]);
        });
    }).then((value) => {
        // prompt.stop();
        return value;
    });
});
exports.promptYesNo = (description = "Are you sure?", color = "default") => __awaiter(void 0, void 0, void 0, function* () {
    description = messages_1.default.colorize(description, color);
    const property = {
        name: "yesno",
        message: "$",
        description,
        validator: /y[es]*|n[o]?/,
        type: "string",
        warning: "Must respond yes or no",
        default: "no",
    };
    return new Promise((resolve, reject) => {
        prompt_1.default.start();
        return prompt_1.default.get(property, (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result.yesno === "yes");
        });
    }).then((value) => {
        // prompt.stop();
        return value;
    });
});
//# sourceMappingURL=prompts.js.map