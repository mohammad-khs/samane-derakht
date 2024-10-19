export interface mainCarouselCardData {
  id: string;
  title: string;
  city_name: string;
  username: string;
  image: null | string;
  province_name: string;
  location_name: string;
  theme_name: string;
  desc: string;
}

export interface Story {
  id: string;
  name: string;
}

export interface CommentCarouselCardData {
  id: string;
  text: string;
  theme_name: string;
  created: string;
  source: string;
  username: string;
}

export interface videoCarouselCardData {
  id: string;
  created: string;
  source: string;
  username: string;
  film: string;
}
