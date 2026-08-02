import { TreeItem } from "@/app/shopping-cart/page";

export const mockShoppingCart: TreeItem[] = [
  {
    id: "cart-item-1",
    tree_type: {
      id: "tree-type-1",
      name: "گردو",
      image: "",
      price: 1500000,
      price_off: 1350000,
      comments: 12,
      rate_avg: 4.5,
      stock_number: 50,
      slug: "walnut",
    },
    quantity: 2,
    created: "2025-07-20",
    each_cost: 1350000,
  },
  {
    id: "cart-item-2",
    tree_type: {
      id: "tree-type-2",
      name: "سرو",
      image: "",
      price: 2300000,
      price_off: 2070000,
      comments: 8,
      rate_avg: 4.8,
      stock_number: 30,
      slug: "cypress",
    },
    quantity: 1,
    created: "2025-07-21",
    each_cost: 2070000,
  },
];

export const mockCartSummary = {
  all_price: { all_price: 4770000 },
  all_price_with_off: { all_price_off: 4320000 },
  all_products_count: 3,
};