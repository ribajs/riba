"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configuration_1 = require("../lib/configuration");
const readers_1 = require("../lib/readers");
class AbstractAction {
    deepCopyInput(inputs) {
        return inputs.map(input => ({ ...input }));
    }
    getInput(inputs, name) {
        const input = inputs.find(input => input.name === name);
        return input;
    }
    setInput(inputs, name, value) {
        const input = inputs.find(input => input.name === name);
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
        const input = inputs.find(input => input.name === name);
        if (!input) {
            inputs.push({ name, value });
            return this.getInput(inputs, name);
        }
        if (typeof (input.value) === 'undefined') {
            input.value = value;
        }
        return input;
    }
    concatOptions(inputsSources) {
        const result = new Array();
        for (const inputs of inputsSources) {
            const toConcat = this.deepCopyInput(inputs);
            for (const input of toConcat) {
                if (typeof (input.value) !== 'undefined') {
                    this.setInput(result, input.name, input.value);
                }
            }
        }
        return result;
    }
    async loadConfiguration() {
        const loader = new configuration_1.ConfigurationLoader(new readers_1.FileSystemReader(process.cwd()));
        return loader.load();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async generateFiles(args, options) {
        return Promise.resolve();
    }
}
exports.AbstractAction = AbstractAction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QuYWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FjdGlvbnMvYWJzdHJhY3QuYWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esd0RBQTJEO0FBQzNELDRDQUFrRDtBQUVsRCxNQUFzQixjQUFjO0lBT3hCLGFBQWEsQ0FBQyxNQUFzQjtRQUM1QyxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsR0FBRyxLQUFLLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVTLFFBQVEsQ0FBQyxNQUFzQixFQUFFLElBQVk7UUFDckQsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUM7UUFDeEQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRVMsUUFBUSxDQUFDLE1BQXNCLEVBQUUsSUFBWSxFQUFFLEtBQXVCO1FBQzlFLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDO1FBQ3hELG9DQUFvQztRQUNwQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO1lBQzNCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDcEM7UUFDRCxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNwQixPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNPLGVBQWUsQ0FBQyxNQUFzQixFQUFFLElBQVksRUFBRSxLQUF1QjtRQUNyRixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO1lBQzNCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDcEM7UUFDRCxJQUFJLE9BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssV0FBVyxFQUFFO1lBQ3ZDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1NBQ3JCO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBR1MsYUFBYSxDQUFDLGFBQStCO1FBQ3JELE1BQU0sTUFBTSxHQUFHLElBQUksS0FBSyxFQUFnQixDQUFDO1FBRXpDLEtBQUssTUFBTSxNQUFNLElBQUksYUFBYSxFQUFFO1lBQ2xDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDNUMsS0FBSyxNQUFNLEtBQUssSUFBSSxRQUFRLEVBQUU7Z0JBQzVCLElBQUksT0FBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxXQUFXLEVBQUU7b0JBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO2lCQUMvQzthQUNGO1NBQ0Y7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRVMsS0FBSyxDQUFDLGlCQUFpQjtRQUMvQixNQUFNLE1BQU0sR0FBeUIsSUFBSSxtQ0FBbUIsQ0FDMUQsSUFBSSwwQkFBZ0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FDcEMsQ0FBQztRQUNGLE9BQU8sTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCw2REFBNkQ7SUFDbkQsS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFvQixFQUFFLE9BQXVCO1FBQ3pFLE9BQU8sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzNCLENBQUM7Q0FFRjtBQXhFRCx3Q0F3RUMifQ==