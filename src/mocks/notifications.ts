export interface NotificationType {
  id: string;
  slug: string;
  notif_type: number;
  url_for_order: string | null;
  url_for_reply_comment: string | null;
  url_for_ticket: string | null;
  url_for_transaction: string | null;
}

export const mockNotifications: NotificationType[] = [
  {
    id: "notif-1",
    slug: "walnut-tree",
    notif_type: 5,
    url_for_order: null,
    url_for_reply_comment: "/products/walnut-tree",
    url_for_ticket: null,
    url_for_transaction: null,
  },
  {
    id: "notif-2",
    slug: "",
    notif_type: 4,
    url_for_order: "/dashboard/orders",
    url_for_reply_comment: null,
    url_for_ticket: null,
    url_for_transaction: null,
  },
  {
    id: "notif-3",
    slug: "",
    notif_type: 6,
    url_for_order: null,
    url_for_reply_comment: null,
    url_for_ticket: null,
    url_for_transaction: "/dashboard/transactions",
  },
  {
    id: "notif-4",
    slug: "",
    notif_type: 3,
    url_for_order: null,
    url_for_reply_comment: null,
    url_for_ticket: "ticket-123",
    url_for_transaction: null,
  },
  {
    id: "notif-5",
    slug: "cedar-tree",
    notif_type: 1,
    url_for_order: null,
    url_for_reply_comment: "/products/cedar-tree",
    url_for_ticket: null,
    url_for_transaction: null,
  },
];

export const mockNotificationCount = 5;