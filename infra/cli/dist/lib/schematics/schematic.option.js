"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchematicOption = void 0;
const core_1 = require("@angular-devkit/core");
class SchematicOption {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
    toCommandString() {
        if (typeof this.value === "string") {
            if (this.name === "name") {
                return `--${this.name}=${this.format()}`;
            }
            else if (this.name === "version" || this.name === "path") {
                return `--${this.name}=${this.value}`;
            }
            else {
                return `--${this.name}="${this.value}"`;
            }
        }
        else if (typeof this.value === "boolean") {
            const str = core_1.strings.dasherize(this.name);
            return this.value ? `--${str}` : `--no-${str}`;
        }
        else {
            return `--${core_1.strings.dasherize(this.name)}=${this.value}`;
        }
    }
    format() {
        return core_1.strings
            .dasherize(this.value)
            .split("")
            .reduce((content, char) => {
            if (char === "(" || char === ")" || char === "[" || char === "]") {
                return `${content}\\${char}`;
            }
            return `${content}${char}`;
        }, "");
    }
}
exports.SchematicOption = SchematicOption;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hdGljLm9wdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvc2NoZW1hdGljcy9zY2hlbWF0aWMub3B0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtDQUErQztBQUUvQyxNQUFhLGVBQWU7SUFDMUIsWUFBb0IsSUFBWSxFQUFVLEtBQXVCO1FBQTdDLFNBQUksR0FBSixJQUFJLENBQVE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFrQjtJQUFHLENBQUM7SUFFOUQsZUFBZTtRQUNwQixJQUFJLE9BQU8sSUFBSSxDQUFDLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDbEMsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtnQkFDeEIsT0FBTyxLQUFLLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUM7YUFDMUM7aUJBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtnQkFDMUQsT0FBTyxLQUFLLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ3ZDO2lCQUFNO2dCQUNMLE9BQU8sS0FBSyxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQzthQUN6QztTQUNGO2FBQU0sSUFBSSxPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQzFDLE1BQU0sR0FBRyxHQUFHLGNBQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztTQUNoRDthQUFNO1lBQ0wsT0FBTyxLQUFLLGNBQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUMxRDtJQUNILENBQUM7SUFFTyxNQUFNO1FBQ1osT0FBTyxjQUFPO2FBQ1gsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFlLENBQUM7YUFDL0IsS0FBSyxDQUFDLEVBQUUsQ0FBQzthQUNULE1BQU0sQ0FBQyxDQUFDLE9BQWUsRUFBRSxJQUFZLEVBQUUsRUFBRTtZQUN4QyxJQUFJLElBQUksS0FBSyxHQUFHLElBQUksSUFBSSxLQUFLLEdBQUcsSUFBSSxJQUFJLEtBQUssR0FBRyxJQUFJLElBQUksS0FBSyxHQUFHLEVBQUU7Z0JBQ2hFLE9BQU8sR0FBRyxPQUFPLEtBQUssSUFBSSxFQUFFLENBQUM7YUFDOUI7WUFDRCxPQUFPLEdBQUcsT0FBTyxHQUFHLElBQUksRUFBRSxDQUFDO1FBQzdCLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNYLENBQUM7Q0FDRjtBQS9CRCwwQ0ErQkMifQ==