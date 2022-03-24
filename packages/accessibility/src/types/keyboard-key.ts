export interface KeyboardKey {
  name: string;
  /** event.which */
  which: number;
  /** event.key */
  key: string;
  /** event.code */
  code: string;
  note?: string;
}
