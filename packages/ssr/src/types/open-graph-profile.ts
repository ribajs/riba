export interface OpenGraphProfile {
  /** A name normally given to an individual by a parent or self-chosen. */
  first_name: string;
  /** A name inherited from a family or marriage and by which the individual is commonly known. */
  last_name: string;
  /** A short unique string to identify them. */
  username: string;
  /** Their gender. */
  gender: "male" | "female" | string;
}
