/**
 * `formatNumber` function formats a number to a string with commas.
 */
export const formatNumber = (num: number | undefined) => {
  if (num == undefined) return '0';
  return num.toLocaleString();
};
