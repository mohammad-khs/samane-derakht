import { MyMainTreeData } from "@/app/myTree/[mainTreeId]/page";
import { mockMainCarouselData } from "./mainCarousel";
import { mockTreeComments } from "./treeComments";

export const mockMyMainTreeData: MyMainTreeData = {
  offset: 0,
  can_edit: true,
  data: {
    id: "my-tree-1",
    user_username: "علی احمدی",
    irani_time: "1403/10/25",
    image: "",
    scan_numbers: 45,
    time_joined: "2025-01-15",
    comment_numbers: 12,
    images_list: [mockMainCarouselData],
    voice: "",
    video: "",
    description: "یک درخت نخل زیبا در قلب تهران",
    longtitud: "51.3890",
    latitud: "35.7447",
    comments: mockTreeComments,
    title: "درخت نخل من",
  },
  saved: false,
};
