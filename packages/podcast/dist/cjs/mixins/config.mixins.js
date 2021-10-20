"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlayerConfig = exports.getEpisodeConfig = void 0;
const core_1 = require("@ribajs/core");
const getEpisodeConfig = (episodeConfigUrl) => {
    return core_1.HttpService.getJSON(episodeConfigUrl);
};
exports.getEpisodeConfig = getEpisodeConfig;
const getPlayerConfig = (playerConfigUrl) => {
    return core_1.HttpService.getJSON(playerConfigUrl);
};
exports.getPlayerConfig = getPlayerConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLm1peGlucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9taXhpbnMvY29uZmlnLm1peGlucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx1Q0FBMkM7QUFJcEMsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLGdCQUF3QixFQUFFLEVBQUU7SUFDM0QsT0FBTyxrQkFBVyxDQUFDLE9BQU8sQ0FBMEIsZ0JBQWdCLENBQUMsQ0FBQztBQUN4RSxDQUFDLENBQUE7QUFGWSxRQUFBLGdCQUFnQixvQkFFNUI7QUFDTSxNQUFNLGVBQWUsR0FBRyxDQUFDLGVBQXVCLEVBQUUsRUFBRTtJQUN6RCxPQUFPLGtCQUFXLENBQUMsT0FBTyxDQUF5QixlQUFlLENBQUMsQ0FBQztBQUN0RSxDQUFDLENBQUE7QUFGWSxRQUFBLGVBQWUsbUJBRTNCIn0=