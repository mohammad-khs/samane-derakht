export function stringIsNotNumber(input: string) {
  if (/[^0-9]/.test(input)) {
    return true;
  }
  return false;
}
