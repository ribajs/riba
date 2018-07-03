import { Utils } from '../../utils';


export const pluralize = (input: any, singular: string, plural: string) => {
  if (plural === null) {
    plural = singular + 's';
  }
  if (Utils.isArray(input)) {
    input = input.length;
  }
  if (input === 1) {
    return singular;
  } else {
    return plural;
  }
};