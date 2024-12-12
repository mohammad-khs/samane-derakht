export function stringIsNotNumber(input: string) {
  if (/[^0-9]/.test(input)) {
    return true;
  }
  return false;
}

export function validatePhoneNumber(phone: string) {
  if (phone.length < 10 || phone.length > 11 || stringIsNotNumber(phone)) {
    return {
      error: "شماره تلفن وارد شده دارای فرمت صحیح نمی‌باشد",
      phone: null,
    };
  } else if (phone[0] !== "0") {
    phone = `0${phone}`;
  }

  return {
    error: null,
    phone,
  };
}
