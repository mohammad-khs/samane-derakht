export function formatNumberWithCommas(num: number): string {
  if (num === 0) {
    return "0";
  }
  if (!num) {
    return "";
  }

  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
