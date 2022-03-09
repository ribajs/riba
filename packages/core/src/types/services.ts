import { AnyService } from "./any-service.js";

export interface Services {
  [name: string]: AnyService;
}
