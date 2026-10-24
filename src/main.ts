import './style.css';
import { initTheme, getCurrentTheme } from './theme';
import type { PageRoute } from './types';
import { renderHeader, bindHeaderEvents } from './components/Header';
import { renderOverviewPage, bindOverviewEvents } from './pages/OverviewPage';
import { renderNewTicketPage, bindNewTicketEvents } from './pages/NewTicketPage';
import { renderFaqPage, bindFaqEvents } from './pages/FaqPage';
import { renderSettingsPage, bindSettingsEvents } from './pages/SettingsPage';

const app = document.querySelector<HTMLDivElement>('#app')!;

function parseRoute(): PageRoute {
  const hash = window.location.hash.replace('#', '').trim();
  if (hash === 'new-ticket' || hash === 'faq' || hash === 'settings') {
    return hash;
  }
  return 'overview';
}

function renderApp(): void {
  const currentRoute = parseRoute();

  let pageContent = '';
  switch (currentRoute) {
    case 'overview':
      pageContent = renderOverviewPage();
      break;
    case 'new-ticket':
      pageContent = renderNewTicketPage();
      break;
    case 'faq':
      pageContent = renderFaqPage();
      break;
    case 'settings':
      pageContent = renderSettingsPage();
      break;
  }

  app.innerHTML = `
    ${renderHeader(currentRoute)}
    <main id="main-content" role="main">
      ${pageContent}
    </main>
  `;

  // Bind Header Events (Theme toggle, mobile navigation)
  bindHeaderEvents(app, (route) => {
    window.location.hash = `#${route}`;
  });

  // Bind Page-specific Events
  switch (currentRoute) {
    case 'overview':
      bindOverviewEvents(app);
      break;
    case 'new-ticket':
      bindNewTicketEvents(app, (route) => {
        window.location.hash = `#${route}`;
      });
      break;
    case 'faq':
      bindFaqEvents(app);
      break;
    case 'settings':
      bindSettingsEvents(app);
      break;
  }
}

// Initialize theme from storage
initTheme();

// Initial render
renderApp();

// Listen to page navigation
window.addEventListener('hashchange', () => {
  renderApp();
  window.scrollTo(0, 0);
});

// Listen to theme changes to refresh header/settings without full reload
window.addEventListener('themechange', () => {
  const currentRoute = parseRoute();
  const headerElem = document.querySelector<HTMLElement>('.dashboard-header');
  if (headerElem) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = renderHeader(currentRoute);
    const newHeader = tempDiv.firstElementChild as HTMLElement;
    headerElem.replaceWith(newHeader);
    bindHeaderEvents(app, (route) => {
      window.location.hash = `#${route}`;
    });
  }

  // If on settings page, update radio state
  if (currentRoute === 'settings') {
    const active = getCurrentTheme();
    const lightRadio = document.querySelector<HTMLInputElement>('#theme-opt-light');
    const darkRadio = document.querySelector<HTMLInputElement>('#theme-opt-dark');
    if (lightRadio && darkRadio) {
      lightRadio.checked = active === 'light';
      darkRadio.checked = active === 'dark';
      lightRadio.closest('.theme-choice-card')?.classList.toggle('selected', active === 'light');
      darkRadio.closest('.theme-choice-card')?.classList.toggle('selected', active === 'dark');
    }
  }
});
