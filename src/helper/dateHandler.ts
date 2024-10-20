export const monthNumToMonthName = (name: string) => {
  switch (name) {
    case "01":
    case "1":
      return "فروردین";
    case "02":
    case "2":
      return "اردیبهشت";

    case "03":
    case "3":
      return "خرداد";

    case "04":
    case "4":
      return "تیر";

    case "05":
    case "5":
      return "مرداد";

    case "06":
    case "6":
      return "شهریور";

    case "07":
    case "7":
      return "مهر";

    case "08":
    case "8":
      return "آبان";

    case "09":
    case "9":
      return "آذر";

    case "10":
      return "دی";

    case "11":
      return "بهمن";

    case "12":
      return "اسفند";

    default:
      return "ماه نامعتبر";
  }
};


export const DateFormatDMY = (date: string) => {
  const fullDate = date.split(" ");
  const dMY = fullDate[0].split("-");

  return {
    day: dMY[0],
    month: dMY[1],
    year: dMY[2],
  };
};