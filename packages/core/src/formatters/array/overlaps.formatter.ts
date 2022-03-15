/**
 * Returns true if an array overlaps with another array.
 * @see https://gist.github.com/der-On/cdafe908847e2b882691
 */
export const overlapsFormatter = {
  name: "overlaps",
  read(value: any[], search: any[]) {
    for (const a of value) {
      for (const b of search) {
        if (a.equals && a.equals(b)) {
          return true;
        }
        if (a === b) {
          return true;
        }
      }
    }
    return false;
  }
};
