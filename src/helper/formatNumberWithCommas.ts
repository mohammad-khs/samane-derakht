export function formatNumberWithCommas(num: number): string {
  if (!num) {
    return "";
  }
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
