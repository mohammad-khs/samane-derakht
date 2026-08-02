export interface Order {
  city_name: string;
  custom_order_id: string;
  final_price: number;
  id: string;
  is_paid: boolean;
  items: unknown[];
  location_name: string;
  order_status: string;
  province_name: string;
}

export const mockFinishedOrders: Order[] = [
  {
    city_name: "تهران",
    custom_order_id: "ORD-001",
    final_price: 1500000,
    id: "order-1",
    is_paid: true,
    items: [],
    location_name: "پارک ملت",
    order_status: "completed",
    province_name: "تهران",
  },
  {
    city_name: "اصفهان",
    custom_order_id: "ORD-002",
    final_price: 2300000,
    id: "order-2",
    is_paid: true,
    items: [],
    location_name: "باغ تاريخي",
    order_status: "completed",
    province_name: "اصفهان",
  },
];

export const mockWaitingOrders: Order[] = [
  {
    city_name: "شیراز",
    custom_order_id: "ORD-003",
    final_price: 1800000,
    id: "order-3",
    is_paid: false,
    items: [],
    location_name: "باغ ارم",
    order_status: "pending",
    province_name: "فارس",
  },
  {
    city_name: "یزد",
    custom_order_id: "ORD-004",
    final_price: 950000,
    id: "order-4",
    is_paid: false,
    items: [],
    location_name: "باغستان",
    order_status: "pending",
    province_name: "یزد",
  },
];