"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi91aS9xdWVzdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBYSxRQUFBLGFBQWEsR0FBRyxDQUFDLElBQVksRUFBRSxPQUFlLEVBQUUsRUFBRTtJQUM3RCxPQUFPLENBQUMsYUFBcUIsRUFBTyxFQUFFLENBQUMsQ0FBQztRQUN0QyxJQUFJLEVBQUUsT0FBTztRQUNiLElBQUk7UUFDSixPQUFPO1FBQ1AsT0FBTyxFQUFFLGFBQWE7S0FDdkIsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBRVcsUUFBQSxjQUFjLEdBQUcsQ0FDNUIsSUFBWSxFQUN1QyxFQUFFO0lBQ3JELE9BQU8sQ0FBQyxPQUFlLEVBQUUsRUFBRTtRQUN6QixPQUFPLENBQUMsT0FBaUIsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUM3QixJQUFJLEVBQUUsTUFBTTtZQUNaLElBQUk7WUFDSixPQUFPO1lBQ1AsT0FBTztTQUNSLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyJ9