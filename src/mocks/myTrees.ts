export interface MyTreeItem {
  id: string;
  tree_name: string;
  scan_numbers: number;
  allowed_to_ask_for_status: boolean | string;
  button_status: boolean;
  city_name: string;
  latitud: string;
  location_name: string;
  longtitud: string;
  order_custom_id: string;
  price: number;
  province_name: string;
  show_status_message: null | string;
  tree_type_image: string;
  tree_type_slug: string;
}

export interface MyTrees {
  data: MyTreeItem[];
  offset: number;
}

export const mockMyTreesData: MyTrees = {
  data: [
    {
      id: "my-tree-1",
      tree_name: "گردو",
      scan_numbers: 45,
      allowed_to_ask_for_status: true,
      button_status: true,
      city_name: "تهران",
      latitud: "35.7447",
      location_name: "پارک ملت",
      longtitud: "51.3890",
      order_custom_id: "ORD-001",
      price: 1500000,
      province_name: "تهران",
      show_status_message: null,
      tree_type_image: "",
      tree_type_slug: "walnut",
    },
    {
      id: "my-tree-2",
      tree_name: "سرو",
      scan_numbers: 32,
      allowed_to_ask_for_status: true,
      button_status: true,
      city_name: "شیراز",
      latitud: "29.5900",
      location_name: "باغ ارم",
      longtitud: "54.9000",
      order_custom_id: "ORD-002",
      price: 2300000,
      province_name: "فارس",
      show_status_message: null,
      tree_type_image: "",
      tree_type_slug: "cypress",
    },
    {
      id: "my-tree-3",
      tree_name: "نخل",
      scan_numbers: 67,
      allowed_to_ask_for_status: "0 روز, 10:00",
      button_status: false,
      city_name: "تهران",
      latitud: "35.7447",
      location_name: "پارک ملت",
      longtitud: "51.3890",
      order_custom_id: "ORD-005",
      price: 800000,
      province_name: "تهران",
      show_status_message: null,
      tree_type_image: "",
      tree_type_slug: "palm",
    },
  ],
  offset: 0,
};