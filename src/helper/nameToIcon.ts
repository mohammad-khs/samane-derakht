export const apiNameToIconName = (name: string) => {
  switch (name) {
    case "تولد":
      return "birthday";

    case "فوت":
      return "funeral";

    case "طبیعت":
      return "nature";

    case "تولد فرزند":
      return "childBirth";

    case "تولد نوزاد":
      return "babysBirth";

    case "سالگردفوت":
      return "deathAnniversary";

    case "عشق":
      return "love";

    case "جشن":
      return "celebration";

    case "ازدواج":
      return "marriage";

    case "تولد پدر ومادر":
      return "parentsBirthday";

    default:
      return "nature";
  }
};
