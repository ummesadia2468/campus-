import { initialFaqs } from '../data';

export function renderFaqPage(): string {
  return `
    <div class="page-container faq-page">
      <div class="page-header">
        <div class="page-header-text">
          <h1 class="page-title">Campus Knowledge Base</h1>
          <p class="page-description">Find quick answers and self-service guides for common IT and campus facility questions.</p>
        </div>
      </div>

      <div class="faq-search-section">
        <div class="search-input-wrap">
          <svg class="search-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input 
            type="text" 
            id="faq-search-input" 
            class="form-control search-input" 
            placeholder="Search FAQs, Wi-Fi setup, software licenses..." 
            aria-label="Search FAQs"
          />
        </div>
      </div>

      <div class="faq-grid" id="faq-grid">
        ${renderFaqCards(initialFaqs)}
      </div>

      <div id="no-faqs-msg" class="empty-state hidden">
        <p>No FAQ articles matched your search. You can submit a support ticket for personal assistance.</p>
        <a href="#new-ticket" class="btn btn-primary" style="margin-top: 12px;">Create Ticket</a>
      </div>
    </div>
  `;
}

function renderFaqCards(faqs: typeof initialFaqs): string {
  return faqs.map(faq => `
    <article class="dashboard-card faq-card" data-category="${faq.category}">
      <div class="faq-card-header">
        <span class="category-tag">${faq.category}</span>
      </div>
      <h3 class="faq-question">${faq.question}</h3>
      <p class="faq-answer">${faq.answer}</p>
    </article>
  `).join('');
}

export function bindFaqEvents(container: HTMLElement): void {
  const input = container.querySelector<HTMLInputElement>('#faq-search-input');
  const grid = container.querySelector<HTMLElement>('#faq-grid');
  const empty = container.querySelector<HTMLElement>('#no-faqs-msg');

  if (input && grid) {
    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      const filtered = initialFaqs.filter(f => 
        f.question.toLowerCase().includes(q) || 
        f.answer.toLowerCase().includes(q) || 
        f.category.toLowerCase().includes(q)
      );

      grid.innerHTML = renderFaqCards(filtered);
      if (empty) {
        if (filtered.length === 0) {
          empty.classList.remove('hidden');
        } else {
          empty.classList.add('hidden');
        }
      }
    });
  }
}
