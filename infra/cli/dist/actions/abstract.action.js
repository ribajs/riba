"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractAction = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QuYWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FjdGlvbnMvYWJzdHJhY3QuYWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUlBLHNEQUFpRTtBQUNqRSxnREFBd0Q7QUFFeEQsTUFBc0IsY0FBYztJQU94QixhQUFhLENBQUMsTUFBc0I7UUFDNUMsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVTLFFBQVEsQ0FBQyxNQUFzQixFQUFFLElBQVk7UUFDckQsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQztRQUMxRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFUyxRQUFRLENBQ2hCLE1BQXNCLEVBQ3RCLElBQVksRUFDWixLQUF1QjtRQUV2QixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDO1FBQzFELG9DQUFvQztRQUNwQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQzdCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDcEM7UUFDRCxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNwQixPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNPLGVBQWUsQ0FDdkIsTUFBc0IsRUFDdEIsSUFBWSxFQUNaLEtBQXVCO1FBRXZCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUM3QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3BDO1FBQ0QsSUFBSSxPQUFPLEtBQUssQ0FBQyxLQUFLLEtBQUssV0FBVyxFQUFFO1lBQ3RDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1NBQ3JCO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRVMsYUFBYSxDQUFDLGFBQStCO1FBQ3JELE1BQU0sTUFBTSxHQUFHLElBQUksS0FBSyxFQUFnQixDQUFDO1FBRXpDLEtBQUssTUFBTSxNQUFNLElBQUksYUFBYSxFQUFFO1lBQ2xDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDNUMsS0FBSyxNQUFNLEtBQUssSUFBSSxRQUFRLEVBQUU7Z0JBQzVCLElBQUksT0FBTyxLQUFLLENBQUMsS0FBSyxLQUFLLFdBQVcsRUFBRTtvQkFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2hEO2FBQ0Y7U0FDRjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFUyxLQUFLLENBQUMsaUJBQWlCO1FBQy9CLE1BQU0sTUFBTSxHQUF5QixJQUFJLDJCQUFtQixDQUMxRCxJQUFJLHdCQUFnQixDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUNwQyxDQUFDO1FBQ0YsT0FBTyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVTLEtBQUssQ0FBQyxhQUFhO0lBQzNCLDZEQUE2RDtJQUM3RCxJQUFvQjtJQUNwQiw2REFBNkQ7SUFDN0QsT0FBdUI7UUFFdkIsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDM0IsQ0FBQztDQUNGO0FBbEZELHdDQWtGQyJ9