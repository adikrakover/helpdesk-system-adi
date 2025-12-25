// src/types/ticket.ts
// אין כאן שום HTML, לכן הסיומת היא .ts

export interface Ticket {
    id: number;
    subject: string;
    description: string;
    status_id: number;      // נוסף לפי מבנה ה-DB ששלחת
    priority_id: number;    // נוסף לפי מבנה ה-DB ששלחת
    status_name?: string;   // השם שהשרת מחזיר ב-JOIN
    priority_name?: string; // השם שהשרת מחזיר ב-JOIN
    created_at: string;
    created_by: number;
    assigned_to?: number;
    created_by_name?: string;
  }