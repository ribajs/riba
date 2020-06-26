/**
 * Generates a random color
 * @see https://stackoverflow.com/a/1484514/1465919
 */
export const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
