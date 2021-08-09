const numFormat = new Intl.NumberFormat("en-IN");
const thousand = 1000;
const million = thousand * thousand;
const billion = thousand * million;
const trillion = thousand * billion;
export default function formatNumber(num, allNumbers) {
  if (!num) {
    return 0;
  }
  if (allNumbers) {
    return numFormat.format(num);
  }
  if (num >= trillion) {
    return numFormat.format((num / trillion).toFixed(1)) + "T";
  }
  if (num >= billion) {
    return numFormat.format((num / billion).toFixed(1)) + "B";
  }
  if (num >= million) {
    return numFormat.format((num / million).toFixed(1)) + "M";
  }
  if (num >= thousand) {
    return numFormat.format((num / thousand).toFixed(1)) + "K";
  }
  return num;
}
