import { HttpService } from "@ribajs/core/src/index.js";
export class PodloveService {
    static getEpisodeConfig(episodeConfigUrl) {
        return HttpService.getJSON(episodeConfigUrl);
    }
    static getPlayerConfig(playerConfigUrl) {
        return HttpService.getJSON(playerConfigUrl);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9kbG92ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL3BvZGxvdmUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFJeEQsTUFBTSxPQUFPLGNBQWM7SUFDekIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLGdCQUF3QjtRQUM5QyxPQUFPLFdBQVcsQ0FBQyxPQUFPLENBQTBCLGdCQUFnQixDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUNELE1BQU0sQ0FBQyxlQUFlLENBQUMsZUFBdUI7UUFDNUMsT0FBTyxXQUFXLENBQUMsT0FBTyxDQUF5QixlQUFlLENBQUMsQ0FBQztJQUN0RSxDQUFDO0NBQ0YifQ==