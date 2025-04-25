/**
 * `formatNumber` function formats a number to a string with commas.
 */
export const formatNumber = (num: number | undefined) => {
  if (num == undefined) return '0';
  return num.toLocaleString();
};

export const humanFileSize = (size: number | undefined) => {
  if (size == undefined) return '0 B';
  let i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  return Number((size / Math.pow(1024, i)).toFixed(2)) + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
}
