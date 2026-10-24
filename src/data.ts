import type { Ticket, FaqItem } from './types';

export const initialTickets: Ticket[] = [
  {
    id: 'KAN-4',
    title: 'Add Theme Toggle to Campus Help Desk Dashboard',
    category: 'Software',
    location: 'Campus Portal / IT Lab 1',
    priority: 'Medium',
    status: 'In Progress',
    requester: 'Sadia Ramzan',
    createdAt: 'Today at 10:53 AM',
    description: 'Implement a clearly visible theme toggle to switch between Light Mode and Dark Mode across all dashboard pages.'
  },
  {
    id: 'TICK-102',
    title: 'Projector HDMI port flickering in Lecture Hall B',
    category: 'Classroom AV',
    location: 'Block C, Hall B',
    priority: 'High',
    status: 'Open',
    requester: 'Dr. Tariq Mahmood',
    createdAt: 'Today at 09:15 AM',
    description: 'Main display flickers every few seconds during presentations. Needs cable or port replacement before afternoon lecture.'
  },
  {
    id: 'TICK-103',
    title: 'Library 2nd Floor Wi-Fi authentication dropping',
    category: 'Network & Wi-Fi',
    location: 'Central Library, 2nd Floor',
    priority: 'Urgent',
    status: 'In Progress',
    requester: 'Student Council',
    createdAt: 'Yesterday at 04:30 PM',
    description: 'Students experiencing frequent disconnections from the campus eduroam access points.'
  },
  {
    id: 'TICK-104',
    title: 'Engineering Lab 4 - Workstation #12 RAM error',
    category: 'Hardware',
    location: 'Eng Building, Lab 4',
    priority: 'Medium',
    status: 'Resolved',
    requester: 'Lab Instructor Asim',
    createdAt: 'Oct 22, 2026',
    description: 'Workstation 12 was beeping on boot. Faulty 8GB DDR4 RAM stick replaced and diagnostics passed.'
  },
  {
    id: 'TICK-105',
    title: 'Air conditioning thermostat issue in Server Room',
    category: 'Facilities',
    location: 'Admin Building, Ground Floor',
    priority: 'Urgent',
    status: 'Resolved',
    requester: 'IT Network Ops',
    createdAt: 'Oct 21, 2026',
    description: 'Temperature sensor alert triggered. Facilities technician serviced the backup AC unit.'
  }
];

export const initialFaqs: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'How do I connect my laptop or smartphone to the Campus Wi-Fi?',
    answer: 'Select the "Campus-Secure" or "eduroam" SSID, enter your student/faculty ID and portal password. If prompted for domain, enter campus.edu.pk.',
    category: 'Network & Wi-Fi'
  },
  {
    id: 'faq-2',
    question: 'How can I request urgent AV support for an ongoing class?',
    answer: 'Submit an Urgent ticket in this portal or use the classroom intercom dialed to extension 4357 (HELP) for on-demand technician dispatch.',
    category: 'Classroom AV'
  },
  {
    id: 'faq-3',
    question: 'Where can I access campus-licensed software (MATLAB, Office 365, Adobe)?',
    answer: 'Log in to the campus software distribution portal using your institutional email to download certified installers and license keys.',
    category: 'Software'
  },
  {
    id: 'faq-4',
    question: 'What is the average turnaround time for standard IT support requests?',
    answer: 'Urgent classroom/network issues are addressed within 30 minutes. Medium/Low priority software or workstation tickets are typically resolved within 24 hours.',
    category: 'Support Policy'
  }
];

const TICKETS_KEY = 'campus_helpdesk_tickets';

export function getTickets(): Ticket[] {
  const data = localStorage.getItem(TICKETS_KEY);
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return initialTickets;
    }
  }
  return initialTickets;
}

export function saveTickets(tickets: Ticket[]): void {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
}

export function addTicket(ticket: Omit<Ticket, 'id' | 'createdAt' | 'status'>): Ticket {
  const current = getTickets();
  const nextNumber = current.length + 101;
  const newTicket: Ticket = {
    ...ticket,
    id: `TICK-${nextNumber}`,
    createdAt: 'Just now',
    status: 'Open'
  };
  const updated = [newTicket, ...current];
  saveTickets(updated);
  return newTicket;
}
