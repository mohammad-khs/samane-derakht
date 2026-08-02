export type MainMapType = {
  id: string;
  title: string;
  city_name: string;
  longtitud: string;
  latitud: string;
  theme_tree: string;
};

export const mockMapData: MainMapType[] = [
  {
    id: "map-1",
    title: "پارک ملت - تهران",
    city_name: "تهران",
    longtitud: "51.3890",
    latitud: "35.7447",
    theme_tree: "طبیعت",
  },
  {
    id: "map-2",
    title: "باغ تاريخي - اصفهان",
    city_name: "اصفهان",
    longtitud: "51.6880",
    latitud: "32.6570",
    theme_tree: "سنتی",
  },
  {
    id: "map-3",
    title: "باغ ارم - شیراز",
    city_name: "شیراز",
    longtitud: "54.9000",
    latitud: "29.5900",
    theme_tree: "مقدس",
  },
  {
    id: "map-4",
    title: "باغستان - یزد",
    city_name: "یزد",
    longtitud: "54.3600",
    latitud: "31.8900",
    theme_tree: "صحرایی",
  },
  {
    id: "map-5",
    title: "باغ گیلاس - تبریز",
    city_name: "تبریز",
    longtitud: "46.2400",
    latitud: "38.0800",
    theme_tree: "زیبایی",
  },
  {
    id: "map-6",
    title: "پارک جنگلی - مشهد",
    city_name: "مشهد",
    longtitud: "59.6100",
    latitud: "36.3200",
    theme_tree: "طبیعت",
  },
  {
    id: "map-7",
    title: "باغ شهری - کرمان",
    city_name: "کرمان",
    longtitud: "57.0600",
    latitud: "30.2800",
    theme_tree: "صحرایی",
  },
  {
    id: "map-8",
    title: "پارک ملی - رشت",
    city_name: "رشت",
    longtitud: "49.5800",
    latitud: "37.1500",
    theme_tree: "طبیعت",
  },
];