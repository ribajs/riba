export const MAX_UID = 1000000;

export const getUID = (prefix: string): string => {
  do {
    prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
  } while (document.getElementById(prefix));

  return prefix;
}