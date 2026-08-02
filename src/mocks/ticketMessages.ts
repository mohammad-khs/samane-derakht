export interface MessageType {
  created: string;
  id: string;
  irani: string;
  message: string;
  message_file: string | null;
  receiver_messager: string;
  sender_messager: string;
  sender_user_phone: string;
  ticket: string;
}

export interface TicketMessages {
  messages: MessageType[];
  ticket: TicketType;
}

export interface TicketType {
  id: string;
  subject: string;
  last_mes: string;
  created: string;
  description: string;
  ticket_type: "باز" | "بسته" | "پاسخ داده شده" | "درحال برسی";
  count: number;
  irani: string;
  file: unknown;
}

export const mockTicketMessages: TicketMessages = {
  messages: [
    {
      created: "2025-07-20T10:30:00",
      id: "msg-1",
      irani: "1404/05/10",
      message: "سلام، مشکلی درباره درخت کاشته شده دارم.",
      message_file: null,
      receiver_messager: "admin",
      sender_messager: "user",
      sender_user_phone: "09121234567",
      ticket: "ticket-1",
    },
    {
      created: "2025-07-20T11:00:00",
      id: "msg-2",
      irani: "1404/05/10",
      message: "سلام، مشکل شما را دریافتیم. لطفاً صبر کنید.",
      message_file: null,
      receiver_messager: "user",
      sender_messager: "admin",
      sender_user_phone: "09120000000",
      ticket: "ticket-1",
    },
    {
      created: "2025-07-20T14:15:00",
      id: "msg-3",
      irani: "1404/05/10",
      message: "ممنون از پاسخ شما. آیا راه‌حل دارد؟",
      message_file: null,
      receiver_messager: "admin",
      sender_messager: "user",
      sender_user_phone: "09121234567",
      ticket: "ticket-1",
    },
    {
      created: "2025-07-21T09:00:00",
      id: "msg-4",
      irani: "1404/05/11",
      message: "بله، مشکل شما را بررسی کردیم و راه‌حل ارائه شد.",
      message_file: null,
      receiver_messager: "user",
      sender_messager: "admin",
      sender_user_phone: "09120000000",
      ticket: "ticket-1",
    },
  ],
  ticket: {
    id: "ticket-1",
    subject: "درخواست پشتیبانی برای درخت شماره ۱",
    last_mes: "درخواست شما در حال بررسی است",
    created: "2025-07-20",
    description: "مشکل در درخت کاشته شده در پارک ملت",
    ticket_type: "درحال برسی",
    count: 3,
    irani: "1404/05/10",
    file: null,
  },
};