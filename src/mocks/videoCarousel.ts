export interface videoCarouselCardData {
  id: string;
  created: string;
  source: string;
  username: string;
  film: string;
}

export const mockVideoCarouselData: videoCarouselCardData[] = [
  {
    id: "vid-1",
    created: "2025-06-01",
    source: "/videos/tree-planting.mp4",
    username: "علی احمدی",
    film: "کاشت درخت در پارک",
  },
  {
    id: "vid-2",
    created: "2025-06-15",
    source: "/videos/garden-tour.mp4",
    username: "مریم رضایی",
    film: "گردش در باغ",
  },
  {
    id: "vid-3",
    created: "2025-07-01",
    source: "/videos/nature-walk.mp4",
    username: "حسین محمدی",
    film: "قدم زدن در طبیعت",
  },
];