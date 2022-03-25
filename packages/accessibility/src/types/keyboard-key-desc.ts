export interface KeyboardKeyDesc {
  name: string;
  /** event.which */
  which: number;
  /** event.key */
  key: string;
  /** event.code */
  code: string;
  note?: string;
}
