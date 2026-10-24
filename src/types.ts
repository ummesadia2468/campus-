export type Theme = 'light' | 'dark';

export interface Ticket {
  id: string;
  title: string;
  category: 'Hardware' | 'Network & Wi-Fi' | 'Classroom AV' | 'Software' | 'Facilities';
  location: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Pending';
  requester: string;
  createdAt: string;
  description: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export type PageRoute = 'overview' | 'new-ticket' | 'faq' | 'settings';
