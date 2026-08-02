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

export const mockMyTickets: TicketType[] = [
  {
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
  {
    id: "ticket-2",
    subject: "پاسخ دریافت شد - تیکت شماره ۲",
    last_mes: "پاسخ: مشکل شما را حل کردیم",
    created: "2025-07-15",
    description: "تیکت مربوط به درخواست ارسال وضعیت",
    ticket_type: "پاسخ داده شده",
    count: 5,
    irani: "1404/05/05",
    file: null,
  },
  {
    id: "ticket-3",
    subject: "سوال درباره کاشت درخت",
    last_mes: "ممنون از پاسخ شما",
    created: "2025-07-10",
    description: "سوال عمومی درباره فرآیند کاشت درخت",
    ticket_type: "بسته",
    count: 2,
    irani: "1404/04/28",
    file: null,
  },
];