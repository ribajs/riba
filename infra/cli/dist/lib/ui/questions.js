"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSelect = exports.generateInput = void 0;
exports.generateInput = (name, message) => {
    return (defaultAnswer) => ({
        type: "input",
        name,
        message,
        default: defaultAnswer,
    });
};
exports.generateSelect = (name) => {
    return (message) => {
        return (choices) => ({
            type: "list",
            name,
            message,
            choices,
        });
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi91aS9xdWVzdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQWEsUUFBQSxhQUFhLEdBQUcsQ0FBQyxJQUFZLEVBQUUsT0FBZSxFQUFFLEVBQUU7SUFDN0QsT0FBTyxDQUFDLGFBQXFCLEVBQU8sRUFBRSxDQUFDLENBQUM7UUFDdEMsSUFBSSxFQUFFLE9BQU87UUFDYixJQUFJO1FBQ0osT0FBTztRQUNQLE9BQU8sRUFBRSxhQUFhO0tBQ3ZCLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQztBQUVXLFFBQUEsY0FBYyxHQUFHLENBQzVCLElBQVksRUFDdUMsRUFBRTtJQUNyRCxPQUFPLENBQUMsT0FBZSxFQUFFLEVBQUU7UUFDekIsT0FBTyxDQUFDLE9BQWlCLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDN0IsSUFBSSxFQUFFLE1BQU07WUFDWixJQUFJO1lBQ0osT0FBTztZQUNQLE9BQU87U0FDUixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUM7QUFDSixDQUFDLENBQUMifQ==