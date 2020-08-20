"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystemReader = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1zeXN0ZW0ucmVhZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9yZWFkZXJzL2ZpbGUtc3lzdGVtLnJlYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQXlCO0FBQ3pCLDJDQUE2QjtBQUc3QixNQUFhLGdCQUFnQjtJQUMzQixZQUE2QixTQUFpQjtRQUFqQixjQUFTLEdBQVQsU0FBUyxDQUFRO0lBQUcsQ0FBQztJQUUzQyxLQUFLLENBQUMsSUFBSTtRQUNmLE9BQU8sSUFBSSxPQUFPLENBQVcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDL0MsRUFBRSxDQUFDLE9BQU8sQ0FDUixJQUFJLENBQUMsU0FBUyxFQUNkLENBQUMsS0FBbUMsRUFBRSxTQUFtQixFQUFFLEVBQUU7Z0JBQzNELElBQUksS0FBSyxFQUFFO29CQUNULE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDZjtxQkFBTTtvQkFDTCxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQ3BCO1lBQ0gsQ0FBQyxDQUNGLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQVk7UUFDNUIsT0FBTyxJQUFJLE9BQU8sQ0FBUyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUM3QyxFQUFFLENBQUMsUUFBUSxDQUNULEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLEVBQUUsRUFDM0IsQ0FBQyxLQUFtQyxFQUFFLElBQVksRUFBRSxFQUFFO2dCQUNwRCxJQUFJLEtBQUssRUFBRTtvQkFDVCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2Y7cUJBQU07b0JBQ0wsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2lCQUMxQjtZQUNILENBQUMsQ0FDRixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFtQjtRQUN4QyxJQUFJO1lBQ0YsS0FBSyxNQUFNLElBQUksSUFBSSxTQUFTLEVBQUU7Z0JBQzVCLE9BQU8sTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzlCO1NBQ0Y7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLE9BQU8sU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDO2dCQUN6QixDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDNUQsQ0FBQyxDQUFDLFNBQVMsQ0FBQztTQUNmO0lBQ0gsQ0FBQztJQUVNLFVBQVUsQ0FBQyxVQUFtQjtRQUNuQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNyRCxDQUFDO0NBQ0Y7QUFoREQsNENBZ0RDIn0=