export interface HttpServiceOptions {
  crossDomain?: boolean; // TODO remove?
  mode?: 'no-cors' | 'cors' | 'same-origin',
  cache?:
    | "default"
    | "no-store"
    | "reload"
    | "no-cache"
    | "force-cache"
    | "only-if-cached";
}
