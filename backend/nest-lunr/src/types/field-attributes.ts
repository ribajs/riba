export interface FieldAttributes {
  boost?: number;
  extractor?: (doc: any) => string | any | any[];
}
