"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular-devkit/core");
class SchematicOption {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
    toCommandString() {
        if (typeof this.value === 'string') {
            if (this.name === 'name') {
                return `--${this.name}=${this.format()}`;
            }
            else if (this.name === 'version' || this.name === 'path') {
                return `--${this.name}=${this.value}`;
            }
            else {
                return `--${this.name}="${this.value}"`;
            }
        }
        else if (typeof this.value === 'boolean') {
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
            .split('')
            .reduce((content, char) => {
            if (char === '(' || char === ')' || char === '[' || char === ']') {
                return `${content}\\${char}`;
            }
            return `${content}${char}`;
        }, '');
    }
}
exports.SchematicOption = SchematicOption;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hdGljLm9wdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvc2NoZW1hdGljcy9zY2hlbWF0aWMub3B0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQStDO0FBRS9DLE1BQWEsZUFBZTtJQUMxQixZQUFvQixJQUFZLEVBQVUsS0FBdUI7UUFBN0MsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWtCO0lBQUcsQ0FBQztJQUU5RCxlQUFlO1FBQ3BCLElBQUksT0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUNsQyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFFO2dCQUN4QixPQUFPLEtBQUssSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQzthQUMxQztpQkFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFFO2dCQUMxRCxPQUFPLEtBQUssSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDdkM7aUJBQU07Z0JBQ0wsT0FBTyxLQUFLLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDO2FBQ3pDO1NBQ0Y7YUFBTSxJQUFJLE9BQU8sSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDMUMsTUFBTSxHQUFHLEdBQUcsY0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1NBQ2hEO2FBQU07WUFDTCxPQUFPLEtBQUssY0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQzFEO0lBQ0gsQ0FBQztJQUVPLE1BQU07UUFDWixPQUFPLGNBQU87YUFDWCxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQWUsQ0FBQzthQUMvQixLQUFLLENBQUMsRUFBRSxDQUFDO2FBQ1QsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFO1lBQ3hCLElBQUksSUFBSSxLQUFLLEdBQUcsSUFBSSxJQUFJLEtBQUssR0FBRyxJQUFJLElBQUksS0FBSyxHQUFHLElBQUksSUFBSSxLQUFLLEdBQUcsRUFBRTtnQkFDaEUsT0FBTyxHQUFHLE9BQU8sS0FBSyxJQUFJLEVBQUUsQ0FBQzthQUM5QjtZQUNELE9BQU8sR0FBRyxPQUFPLEdBQUcsSUFBSSxFQUFFLENBQUM7UUFDN0IsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztDQUNGO0FBL0JELDBDQStCQyJ9