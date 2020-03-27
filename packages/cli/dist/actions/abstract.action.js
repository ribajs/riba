"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../lib/configuration/index");
const index_2 = require("../lib/readers/index");
class AbstractAction {
    deepCopyInput(inputs) {
        return inputs.map((input) => ({ ...input }));
    }
    getInput(inputs, name) {
        const input = inputs.find((input) => input.name === name);
        return input;
    }
    setInput(inputs, name, value) {
        const input = inputs.find((input) => input.name === name);
        // Add new input if input not exists
        if (!input) {
            inputs.push({ name, value });
            return this.getInput(inputs, name);
        }
        input.value = value;
        return input;
    }
    /**
     * Sets input if value only if the value has not yet been set
     * @param inputs
     * @param name
     * @param value
     */
    setDefaultInput(inputs, name, value) {
        const input = inputs.find((input) => input.name === name);
        if (!input) {
            inputs.push({ name, value });
            return this.getInput(inputs, name);
        }
        if (typeof input.value === "undefined") {
            input.value = value;
        }
        return input;
    }
    concatOptions(inputsSources) {
        const result = new Array();
        for (const inputs of inputsSources) {
            const toConcat = this.deepCopyInput(inputs);
            for (const input of toConcat) {
                if (typeof input.value !== "undefined") {
                    this.setInput(result, input.name, input.value);
                }
            }
        }
        return result;
    }
    async loadConfiguration() {
        const loader = new index_1.ConfigurationLoader(new index_2.FileSystemReader(process.cwd()));
        return loader.load();
    }
    async generateFiles(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    args, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    options) {
        return Promise.resolve();
    }
}
exports.AbstractAction = AbstractAction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QuYWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FjdGlvbnMvYWJzdHJhY3QuYWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsc0RBQWlFO0FBQ2pFLGdEQUF3RDtBQUV4RCxNQUFzQixjQUFjO0lBT3hCLGFBQWEsQ0FBQyxNQUFzQjtRQUM1QyxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRVMsUUFBUSxDQUFDLE1BQXNCLEVBQUUsSUFBWTtRQUNyRCxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDO1FBQzFELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVTLFFBQVEsQ0FDaEIsTUFBc0IsRUFDdEIsSUFBWSxFQUNaLEtBQXVCO1FBRXZCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUM7UUFDMUQsb0NBQW9DO1FBQ3BDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDN0IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNwQztRQUNELEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ08sZUFBZSxDQUN2QixNQUFzQixFQUN0QixJQUFZLEVBQ1osS0FBdUI7UUFFdkIsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQzdCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDcEM7UUFDRCxJQUFJLE9BQU8sS0FBSyxDQUFDLEtBQUssS0FBSyxXQUFXLEVBQUU7WUFDdEMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7U0FDckI7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFUyxhQUFhLENBQUMsYUFBK0I7UUFDckQsTUFBTSxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQWdCLENBQUM7UUFFekMsS0FBSyxNQUFNLE1BQU0sSUFBSSxhQUFhLEVBQUU7WUFDbEMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM1QyxLQUFLLE1BQU0sS0FBSyxJQUFJLFFBQVEsRUFBRTtnQkFDNUIsSUFBSSxPQUFPLEtBQUssQ0FBQyxLQUFLLEtBQUssV0FBVyxFQUFFO29CQUN0QyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDaEQ7YUFDRjtTQUNGO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVTLEtBQUssQ0FBQyxpQkFBaUI7UUFDL0IsTUFBTSxNQUFNLEdBQXlCLElBQUksMkJBQW1CLENBQzFELElBQUksd0JBQWdCLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQ3BDLENBQUM7UUFDRixPQUFPLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRVMsS0FBSyxDQUFDLGFBQWE7SUFDM0IsNkRBQTZEO0lBQzdELElBQW9CO0lBQ3BCLDZEQUE2RDtJQUM3RCxPQUF1QjtRQUV2QixPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUMzQixDQUFDO0NBQ0Y7QUFsRkQsd0NBa0ZDIn0=