"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class FileSystemReader {
    constructor(directory) {
        this.directory = directory;
    }
    async list() {
        return new Promise((resolve, reject) => {
            fs.readdir(this.directory, (error, filenames) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(filenames);
                }
            });
        });
    }
    async read(name) {
        return new Promise((resolve, reject) => {
            fs.readFile(`${this.directory}/${name}`, (error, data) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(data.toString());
                }
            });
        });
    }
    async readAnyOf(filenames) {
        try {
            for (const file of filenames) {
                return await this.read(file);
            }
        }
        catch (err) {
            return filenames.length > 0
                ? await this.readAnyOf(filenames.slice(1, filenames.length))
                : undefined;
        }
    }
    getDirname(pathString) {
        return path.basename(pathString || this.directory);
    }
}
exports.FileSystemReader = FileSystemReader;
