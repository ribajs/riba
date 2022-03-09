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
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeOctoberFormFields = void 0;
const Stream = __importStar(require("stream"));
const yaml = __importStar(require("js-yaml"));
const fs = __importStar(require("fs"));
function mergeOctoberFormFields(path) {
    if (!path)
        throw new Error("Argument required");
    const stream = new Stream.Transform({ objectMode: true });
    stream._transform = function (originalFile, _, callback) {
        const file = originalFile.clone({ contents: false });
        file.path = "theme.yaml";
        if (file.isBuffer()) {
            const input = yaml.load(file.contents.toString()); // TODO
            const toMerge = yaml.load(fs.readFileSync(path).toString()); // TODO
            if (input?.form?.tabs) {
                if (input.form.tabs.fields) {
                    input.form.tabs.fields = { ...input.form.tabs.fields, ...toMerge };
                }
                else {
                    input.form.tabs.fields = { ...toMerge };
                }
                input.form.tabs.fields = { ...input.form.tabs.fields, ...toMerge };
            }
            console.log(toMerge);
            //dump
            file.contents = Buffer.from(yaml.dump(input, {
                styles: {
                    "!!null": "canonical", // dump null as ~
                },
            }));
            console.log("\n### OUTPUT ###\n");
            console.log(file.contents.toString());
        }
        callback(null, file);
    };
    return stream;
}
exports.mergeOctoberFormFields = mergeOctoberFormFields;
