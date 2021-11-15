import { HttpService } from "@ribajs/core";
export class PodloveService {
    static getEpisodeConfig(episodeConfigUrl) {
        return HttpService.getJSON(episodeConfigUrl);
    }
    static getPlayerConfig(playerConfigUrl) {
        return HttpService.getJSON(playerConfigUrl);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9kbG92ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL3BvZGxvdmUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBTTNDLE1BQU0sT0FBTyxjQUFjO0lBQ3pCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBd0I7UUFDOUMsT0FBTyxXQUFXLENBQUMsT0FBTyxDQUEwQixnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFDRCxNQUFNLENBQUMsZUFBZSxDQUFDLGVBQXVCO1FBQzVDLE9BQU8sV0FBVyxDQUFDLE9BQU8sQ0FBeUIsZUFBZSxDQUFDLENBQUM7SUFDdEUsQ0FBQztDQUNGIn0=