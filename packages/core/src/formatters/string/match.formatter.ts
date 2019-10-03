export const matchFormatter = {
  name: 'match',
  read(a: string, regexp: string, flags?: string) {
    return a.match(new RegExp(regexp, flags));
  },
};
