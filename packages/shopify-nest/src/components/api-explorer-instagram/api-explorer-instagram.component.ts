import Debug from 'debug';
import {
  ShopifyNestApiExplorerComponent,
  APIParam,
  APIListItem,
  Scope,
} from '../api-explorer/api-explorer.component';

import { InstagramApiService } from '../../services/instagram-api.service';

export class ShopifyNestApiExplorerInstagramComponent extends ShopifyNestApiExplorerComponent {
  public static tagName = 'shopify-nest-api-explorer-instagram';

  protected apiService = InstagramApiService.getSingleton();

  protected apiList: APIListItem[] = [
    {
      // Freestyle
      label: 'Freestyle',
      url: '/instagram/api/user/accounts',
      short_desc: 'components.apiExplorer.freestyle.short_desc',
      freestyle: true,
    },
    {
      // Recive your facebook user
      label: '/instagram/api/user',
      url: '/instagram/api/user',
      short_desc: 'components.apiExplorer.instagram.user.short_desc',
      roles: ['shopify-staff-member'],
    },
    {
      // Recive a list of your instagram accounts
      label: '/instagram/api/user/accounts',
      url: '/instagram/api/user/accounts',
      short_desc: 'components.apiExplorer.instagram.user.accounts.short_desc',
      roles: ['shopify-staff-member'],
    },
    {
      // Recive a list of your instagram media
      label: '/instagram/api/media/:instagramBusinessAccountID',
      url: '/instagram/api/media/:instagramBusinessAccountID?limit=0',
      short_desc: 'components.apiExplorer.instagram.media.short_desc',
      roles: [],
    },
  ];

  public scope: Scope = {
    langcode: 'en',
    self: this,
    result: '',
    currentParams: [],
    currentQueries: [],
    currentUrl: '',
    currentSelectApi: this.apiList[0],
    send: this.send,
    apiList: this.apiList,
    selectApi: this.selectApi,
    selectFreestyleApi: this.selectFreestyleApi,
    selectApiParamValue: this.selectApiParamValue,
    selectApiQueryValue: this.selectApiQueryValue,
  };

  static get observedAttributes(): string[] {
    return [];
  }

  protected debug = Debug(
    'component:' + ShopifyNestApiExplorerInstagramComponent.tagName,
  );
  constructor() {
    super();
  }

  protected async loadParamValues(param: APIParam) {
    this.debug('loadParamValues', param);
    if (!param.dependenciesResolved) {
      this.debug(
        `Dependencies for this parameter '${param.name}' not resolved`,
      );
      return;
    }
    switch (param.name) {
      case 'instagramBusinessAccountID':
        return this.loadInstagramBusinessAccountIDParamValues();
        break;
    }
  }

  protected async loadInstagramBusinessAccountIDParamValues(/*param: APIParam*/) {
    return this.apiService.accounts().then((accounts) => {
      const businessAccounts = new Array<string>();
      accounts.data.forEach((account: any) => {
        if (
          account.instagram_business_account &&
          account.instagram_business_account.id
        ) {
          businessAccounts.push(account.instagram_business_account.id);
        }
      });
      return businessAccounts;
    });
  }

  protected async loadQueryValues(query: APIParam) {
    this.debug('loadParamValues', query);
    switch (query.name) {
      case 'limit':
        query.type = 'number';
        query.value = 0;
        break;
        break;
    }
    return query;
  }
}
