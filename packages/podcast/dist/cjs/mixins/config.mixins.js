"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlayerConfig = exports.getEpisodeConfig = void 0;
const index_js_1 = require("@ribajs/core/src/index.js");
const getEpisodeConfig = (episodeConfigUrl) => {
    return index_js_1.HttpService.getJSON(episodeConfigUrl);
};
exports.getEpisodeConfig = getEpisodeConfig;
const getPlayerConfig = (playerConfigUrl) => {
    return index_js_1.HttpService.getJSON(playerConfigUrl);
};
exports.getPlayerConfig = getPlayerConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLm1peGlucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9taXhpbnMvY29uZmlnLm1peGlucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3REFBd0Q7QUFJakQsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLGdCQUF3QixFQUFFLEVBQUU7SUFDM0QsT0FBTyxzQkFBVyxDQUFDLE9BQU8sQ0FBMEIsZ0JBQWdCLENBQUMsQ0FBQztBQUN4RSxDQUFDLENBQUM7QUFGVyxRQUFBLGdCQUFnQixvQkFFM0I7QUFDSyxNQUFNLGVBQWUsR0FBRyxDQUFDLGVBQXVCLEVBQUUsRUFBRTtJQUN6RCxPQUFPLHNCQUFXLENBQUMsT0FBTyxDQUF5QixlQUFlLENBQUMsQ0FBQztBQUN0RSxDQUFDLENBQUM7QUFGVyxRQUFBLGVBQWUsbUJBRTFCIn0=