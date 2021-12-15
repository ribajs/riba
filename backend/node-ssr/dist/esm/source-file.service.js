import { resolve } from "path";
import { promises as fs } from "fs";
import { Script } from "vm";
export class SourceFileService {
    constructor(dir) {
        this.dir = dir;
    }
    async load(filename) {
        const path = resolve(this.dir, filename);
        const source = await fs.readFile(path, "utf8");
        const script = new Script(source, {
            filename,
        });
        return {
            source,
            script,
            filename,
            path,
        };
    }
    async loads(filenames) {
        const sourceFiles = [];
        for await (const filename of filenames) {
            sourceFiles.push(await this.load(filename));
        }
        return sourceFiles;
    }
}
//# sourceMappingURL=source-file.service.js.map