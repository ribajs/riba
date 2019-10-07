export const unevenFormatter = {
  name: 'uneven',
  read(num: number) {
    return (num % 2) !== 0;
  },
};
