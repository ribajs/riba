"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PodloveService = void 0;
const core_1 = require("@ribajs/core");
class PodloveService {
    static getEpisodeConfig(episodeConfigUrl) {
        return core_1.HttpService.getJSON(episodeConfigUrl);
    }
    static getPlayerConfig(playerConfigUrl) {
        return core_1.HttpService.getJSON(playerConfigUrl);
    }
}
exports.PodloveService = PodloveService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9kbG92ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL3BvZGxvdmUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx1Q0FBMkM7QUFJM0MsTUFBYSxjQUFjO0lBQ3pCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBd0I7UUFDOUMsT0FBTyxrQkFBVyxDQUFDLE9BQU8sQ0FBMEIsZ0JBQWdCLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBQ0QsTUFBTSxDQUFDLGVBQWUsQ0FBQyxlQUF1QjtRQUM1QyxPQUFPLGtCQUFXLENBQUMsT0FBTyxDQUF5QixlQUFlLENBQUMsQ0FBQztJQUN0RSxDQUFDO0NBQ0Y7QUFQRCx3Q0FPQyJ9