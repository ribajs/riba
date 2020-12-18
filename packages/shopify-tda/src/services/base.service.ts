import { BASE_HOST_URL } from '../constants/index';

export class BaseApiService {

  public host: string

  constructor(host = BASE_HOST_URL) {
    if(host?.endsWith('/')) {
      host = host.substring(0, host.length - 1);
    }
    this.host = host;
  }
}
