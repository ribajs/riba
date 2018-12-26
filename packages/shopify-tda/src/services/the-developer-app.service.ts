export class TheDeveloperAppService {
  public static baseUrl = 'https://the-developer-app.artandcode.studio'; // 'https://next.artandcode.studio';
  public static instance?: TheDeveloperAppService;

  constructor() {
    if (TheDeveloperAppService.instance) {
      return TheDeveloperAppService.instance;
    }
    TheDeveloperAppService.instance = this;
  }
}
