import { addTicket } from '../data';
import type { Ticket } from '../types';

export function renderNewTicketPage(): string {
  return `
    <div class="page-container form-page">
      <div class="page-header">
        <div class="page-header-text">
          <h1 class="page-title">Submit Support Ticket</h1>
          <p class="page-description">Fill out the details below to request IT, hardware, network, or campus facility assistance.</p>
        </div>
      </div>

      <div class="form-card-container">
        <form id="new-ticket-form" class="dashboard-card form-card">
          <div id="form-alert" class="alert-success hidden" role="alert">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Ticket submitted successfully! Redirecting to Overview...</span>
          </div>

          <div class="form-grid">
            <!-- Full Name / Requester -->
            <div class="form-group">
              <label for="requester-name" class="form-label">
                Requester Name <span class="required">*</span>
              </label>
              <input 
                type="text" 
                id="requester-name" 
                class="form-control" 
                placeholder="e.g. Sadia Ramzan" 
                required 
              />
            </div>

            <!-- Requester ID / Email -->
            <div class="form-group">
              <label for="requester-email" class="form-label">
                Campus Email / ID <span class="required">*</span>
              </label>
              <input 
                type="text" 
                id="requester-email" 
                class="form-control" 
                placeholder="e.g. sadiaramzan2468@gmail.com" 
                required 
              />
            </div>

            <!-- Category -->
            <div class="form-group">
              <label for="ticket-category" class="form-label">
                Category <span class="required">*</span>
              </label>
              <select id="ticket-category" class="form-select" required>
                <option value="">Select category...</option>
                <option value="Hardware">Hardware & Peripherals</option>
                <option value="Network & Wi-Fi">Network & Wi-Fi</option>
                <option value="Classroom AV">Classroom AV / Projector</option>
                <option value="Software">Software & OS</option>
                <option value="Facilities">Campus Facilities & Power</option>
              </select>
            </div>

            <!-- Priority -->
            <div class="form-group">
              <label for="ticket-priority" class="form-label">
                Priority Level <span class="required">*</span>
              </label>
              <select id="ticket-priority" class="form-select" required>
                <option value="Low">Low - Minor inquiry or general request</option>
                <option value="Medium" selected>Medium - Normal workstation or software issue</option>
                <option value="High">High - Impairing classroom lecture or lab</option>
                <option value="Urgent">Urgent - Complete network outage or critical system down</option>
              </select>
            </div>

            <!-- Location / Room -->
            <div class="form-group full-width">
              <label for="ticket-location" class="form-label">
                Campus Location / Room Number <span class="required">*</span>
              </label>
              <input 
                type="text" 
                id="ticket-location" 
                class="form-control" 
                placeholder="e.g. Block C - Lecture Hall 2 or CS Lab 3" 
                required 
              />
            </div>

            <!-- Subject / Summary -->
            <div class="form-group full-width">
              <label for="ticket-title" class="form-label">
                Ticket Subject <span class="required">*</span>
              </label>
              <input 
                type="text" 
                id="ticket-title" 
                class="form-control" 
                placeholder="Brief summary of the problem" 
                required 
              />
            </div>

            <!-- Description -->
            <div class="form-group full-width">
              <label for="ticket-desc" class="form-label">
                Detailed Description <span class="required">*</span>
              </label>
              <textarea 
                id="ticket-desc" 
                class="form-control" 
                rows="5" 
                placeholder="Describe what happened, any error messages, and steps already attempted..."
                required
              ></textarea>
            </div>
          </div>

          <div class="form-actions">
            <a href="#overview" class="btn btn-secondary">Cancel</a>
            <button type="submit" class="btn btn-primary" id="submit-ticket-btn">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path></svg>
              Submit Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

export function bindNewTicketEvents(container: HTMLElement, _onNavigate: (route: string) => void): void {
  const form = container.querySelector<HTMLFormElement>('#new-ticket-form');
  const alert = container.querySelector<HTMLElement>('#form-alert');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = (container.querySelector('#requester-name') as HTMLInputElement).value.trim();
      const category = (container.querySelector('#ticket-category') as HTMLSelectElement).value as Ticket['category'];
      const priority = (container.querySelector('#ticket-priority') as HTMLSelectElement).value as Ticket['priority'];
      const location = (container.querySelector('#ticket-location') as HTMLInputElement).value.trim();
      const title = (container.querySelector('#ticket-title') as HTMLInputElement).value.trim();
      const description = (container.querySelector('#ticket-desc') as HTMLTextAreaElement).value.trim();

      addTicket({
        title,
        category,
        priority,
        location,
        requester: name,
        description
      });

      if (alert) {
        alert.classList.remove('hidden');
      }

      setTimeout(() => {
        window.location.hash = '#overview';
      }, 1000);
    });
  }
}
