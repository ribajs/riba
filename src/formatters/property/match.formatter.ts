export const match = (a: string, regexp: string, flags?: string) => {
  return a.match(new RegExp(regexp, flags));
};
