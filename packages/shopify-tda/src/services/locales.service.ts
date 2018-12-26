import { LocalesRestService } from '@ribajs/i18n';
import { BaseService } from './base.service';

export class LocalesService extends LocalesRestService {
  public static instance: LocalesService;
  constructor() {
    let url = `${BaseService.baseUrl}/shopify/api/themes/${(window as any).Shopify.theme.id}/locales`;
    if ((window as any).Shopify.shop) {
      url += `?shop=${(window as any).Shopify.shop}`;
    }
    super(url, true);
    if (LocalesService.instance) {
      return LocalesService.instance;
    }
    LocalesService.instance = this;
  }
}
