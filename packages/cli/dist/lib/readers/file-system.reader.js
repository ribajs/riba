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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1zeXN0ZW0ucmVhZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9yZWFkZXJzL2ZpbGUtc3lzdGVtLnJlYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSx1Q0FBeUI7QUFDekIsMkNBQTZCO0FBRzdCLE1BQWEsZ0JBQWdCO0lBQzNCLFlBQTZCLFNBQWlCO1FBQWpCLGNBQVMsR0FBVCxTQUFTLENBQVE7SUFBRyxDQUFDO0lBRTNDLEtBQUssQ0FBQyxJQUFJO1FBQ2YsT0FBTyxJQUFJLE9BQU8sQ0FBVyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUMvQyxFQUFFLENBQUMsT0FBTyxDQUNSLElBQUksQ0FBQyxTQUFTLEVBQ2QsQ0FBQyxLQUFtQyxFQUFFLFNBQW1CLEVBQUUsRUFBRTtnQkFDM0QsSUFBSSxLQUFLLEVBQUU7b0JBQ1QsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNmO3FCQUFNO29CQUNMLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztpQkFDcEI7WUFDSCxDQUFDLENBQ0YsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBWTtRQUM1QixPQUFPLElBQUksT0FBTyxDQUFTLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQzdDLEVBQUUsQ0FBQyxRQUFRLENBQ1QsR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksRUFBRSxFQUMzQixDQUFDLEtBQW1DLEVBQUUsSUFBWSxFQUFFLEVBQUU7Z0JBQ3BELElBQUksS0FBSyxFQUFFO29CQUNULE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDZjtxQkFBTTtvQkFDTCxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7aUJBQzFCO1lBQ0gsQ0FBQyxDQUNGLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQW1CO1FBQ3hDLElBQUk7WUFDRixLQUFLLE1BQU0sSUFBSSxJQUFJLFNBQVMsRUFBRTtnQkFDNUIsT0FBTyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDOUI7U0FDRjtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osT0FBTyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUM7Z0JBQ3pCLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM1RCxDQUFDLENBQUMsU0FBUyxDQUFDO1NBQ2Y7SUFDSCxDQUFDO0lBRU0sVUFBVSxDQUFDLFVBQW1CO1FBQ25DLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3JELENBQUM7Q0FDRjtBQWhERCw0Q0FnREMifQ==