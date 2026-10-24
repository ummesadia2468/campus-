import type { Ticket } from '../types';
import { getTickets } from '../data';

export function renderOverviewPage(): string {
  const tickets = getTickets();
  const total = tickets.length;
  const inProgress = tickets.filter(t => t.status === 'In Progress').length;
  const open = tickets.filter(t => t.status === 'Open').length;
  const resolved = tickets.filter(t => t.status === 'Resolved').length;

  return `
    <div class="page-container overview-page">
      <!-- Page Hero & Quick Actions -->
      <div class="page-header">
        <div class="page-header-text">
          <h1 class="page-title">Campus Support Dashboard</h1>
          <p class="page-description">Monitor tickets, report IT incidents, and track laboratory equipment requests.</p>
        </div>
        <div class="page-header-actions">
          <a href="#new-ticket" class="btn btn-primary">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"></path></svg>
            Create Ticket
          </a>
        </div>
      </div>

      <!-- Key Metric Cards -->
      <section class="metrics-grid" aria-label="Support Statistics">
        <div class="metric-card">
          <div class="metric-icon-wrap icon-primary">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          </div>
          <div class="metric-content">
            <span class="metric-label">Total Requests</span>
            <span class="metric-value" id="stat-total">${total}</span>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-icon-wrap icon-warning">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
          <div class="metric-content">
            <span class="metric-label">Open Issues</span>
            <span class="metric-value" id="stat-open">${open}</span>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-icon-wrap icon-info">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path></svg>
          </div>
          <div class="metric-content">
            <span class="metric-label">In Progress</span>
            <span class="metric-value" id="stat-progress">${inProgress}</span>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-icon-wrap icon-success">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          </div>
          <div class="metric-content">
            <span class="metric-label">Resolved</span>
            <span class="metric-value" id="stat-resolved">${resolved}</span>
          </div>
        </div>
      </section>

      <!-- Tickets Management Section -->
      <section class="dashboard-card" aria-label="Incident Tickets List">
        <div class="card-header">
          <div class="card-header-title">
            <h2>Recent Support Tickets</h2>
            <span class="badge badge-neutral">${tickets.length} recorded</span>
          </div>
          
          <!-- Filters & Search Toolbar -->
          <div class="table-toolbar">
            <div class="search-input-wrap">
              <svg class="search-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input 
                type="text" 
                id="ticket-search" 
                class="form-control search-input" 
                placeholder="Search by title, requester, or ID..." 
                aria-label="Search tickets"
              />
            </div>

            <div class="filter-dropdown-wrap">
              <select id="filter-category" class="form-select" aria-label="Filter by Category">
                <option value="All">All Categories</option>
                <option value="Hardware">Hardware</option>
                <option value="Network & Wi-Fi">Network & Wi-Fi</option>
                <option value="Classroom AV">Classroom AV</option>
                <option value="Software">Software</option>
                <option value="Facilities">Facilities</option>
              </select>

              <select id="filter-status" class="form-select" aria-label="Filter by Status">
                <option value="All">All Statuses</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Tickets Table / Cards List -->
        <div class="table-responsive">
          <table class="tickets-table" id="tickets-table">
            <thead>
              <tr>
                <th scope="col">Ticket ID</th>
                <th scope="col">Subject & Details</th>
                <th scope="col">Category</th>
                <th scope="col">Location</th>
                <th scope="col">Priority</th>
                <th scope="col">Status</th>
                <th scope="col">Requester</th>
              </tr>
            </thead>
            <tbody id="tickets-tbody">
              ${renderTicketRows(tickets)}
            </tbody>
          </table>
          <div id="no-tickets-msg" class="empty-state ${tickets.length > 0 ? 'hidden' : ''}">
            <p>No tickets match your filter criteria.</p>
          </div>
        </div>
      </section>
    </div>
  `;
}

export function renderTicketRows(tickets: Ticket[]): string {
  if (tickets.length === 0) return '';

  return tickets.map(ticket => {
    const priorityClass = getPriorityBadgeClass(ticket.priority);
    const statusClass = getStatusBadgeClass(ticket.status);

    return `
      <tr class="ticket-row" data-id="${ticket.id}" data-category="${ticket.category}" data-status="${ticket.status}">
        <td class="cell-id">
          <span class="ticket-code">${ticket.id}</span>
        </td>
        <td class="cell-title">
          <div class="ticket-title-text">${ticket.title}</div>
          <div class="ticket-desc-snippet">${ticket.description}</div>
        </td>
        <td class="cell-category">
          <span class="category-tag">${ticket.category}</span>
        </td>
        <td class="cell-location">
          <span class="location-text">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            ${ticket.location}
          </span>
        </td>
        <td class="cell-priority">
          <span class="badge ${priorityClass}">${ticket.priority}</span>
        </td>
        <td class="cell-status">
          <span class="status-pill ${statusClass}">
            <span class="status-dot"></span>
            ${ticket.status}
          </span>
        </td>
        <td class="cell-requester">
          <div class="requester-name">${ticket.requester}</div>
          <div class="requester-date">${ticket.createdAt}</div>
        </td>
      </tr>
    `;
  }).join('');
}

function getPriorityBadgeClass(priority: Ticket['priority']): string {
  switch (priority) {
    case 'Urgent': return 'badge-urgent';
    case 'High': return 'badge-high';
    case 'Medium': return 'badge-medium';
    case 'Low': return 'badge-low';
    default: return 'badge-neutral';
  }
}

function getStatusBadgeClass(status: Ticket['status']): string {
  switch (status) {
    case 'Open': return 'status-open';
    case 'In Progress': return 'status-progress';
    case 'Resolved': return 'status-resolved';
    default: return 'status-pending';
  }
}

export function bindOverviewEvents(container: HTMLElement): void {
  const searchInput = container.querySelector<HTMLInputElement>('#ticket-search');
  const categorySelect = container.querySelector<HTMLSelectElement>('#filter-category');
  const statusSelect = container.querySelector<HTMLSelectElement>('#filter-status');
  const tbody = container.querySelector<HTMLTableSectionElement>('#tickets-tbody');
  const emptyState = container.querySelector<HTMLElement>('#no-tickets-msg');

  function filterTickets(): void {
    const query = searchInput?.value.trim().toLowerCase() || '';
    const selectedCategory = categorySelect?.value || 'All';
    const selectedStatus = statusSelect?.value || 'All';

    const allTickets = getTickets();
    const filtered = allTickets.filter(t => {
      const matchesSearch = !query || 
        t.title.toLowerCase().includes(query) || 
        t.description.toLowerCase().includes(query) || 
        t.requester.toLowerCase().includes(query) || 
        t.id.toLowerCase().includes(query);

      const matchesCat = selectedCategory === 'All' || t.category === selectedCategory;
      const matchesStat = selectedStatus === 'All' || t.status === selectedStatus;

      return matchesSearch && matchesCat && matchesStat;
    });

    if (tbody) {
      tbody.innerHTML = renderTicketRows(filtered);
    }
    if (emptyState) {
      if (filtered.length === 0) {
        emptyState.classList.remove('hidden');
      } else {
        emptyState.classList.add('hidden');
      }
    }
  }

  searchInput?.addEventListener('input', filterTickets);
  categorySelect?.addEventListener('change', filterTickets);
  statusSelect?.addEventListener('change', filterTickets);
}
