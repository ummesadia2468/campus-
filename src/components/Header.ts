import { getCurrentTheme, toggleTheme, SunIcon, MoonIcon } from '../theme';
import type { PageRoute } from '../types';

export function renderHeader(activeRoute: PageRoute): string {
  const currentTheme = getCurrentTheme();
  const isDark = currentTheme === 'dark';
  const toggleLabel = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
  const icon = isDark ? SunIcon : MoonIcon;
  const modeText = isDark ? 'Light Mode' : 'Dark Mode';

  return `
    <header class="dashboard-header" role="banner">
      <div class="header-container">
        <!-- Logo & Brand -->
        <a href="#overview" class="brand-link" aria-label="Campus Help Desk Home">
          <div class="brand-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
              <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
            </svg>
          </div>
          <div class="brand-text">
            <span class="brand-title">Campus Help Desk</span>
            <span class="brand-subtitle">Student & Staff Portal</span>
          </div>
        </a>

        <!-- Desktop Navigation -->
        <nav class="desktop-nav" aria-label="Main Navigation">
          <ul class="nav-list">
            <li>
              <a href="#overview" class="nav-item ${activeRoute === 'overview' ? 'active' : ''}">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                Overview
              </a>
            </li>
            <li>
              <a href="#new-ticket" class="nav-item ${activeRoute === 'new-ticket' ? 'active' : ''}">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"></path></svg>
                New Ticket
              </a>
            </li>
            <li>
              <a href="#faq" class="nav-item ${activeRoute === 'faq' ? 'active' : ''}">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                Knowledge Base
              </a>
            </li>
            <li>
              <a href="#settings" class="nav-item ${activeRoute === 'settings' ? 'active' : ''}">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                Settings
              </a>
            </li>
          </ul>
        </nav>

        <!-- Right Header Actions (Theme Toggle & User Profile) -->
        <div class="header-actions">
          <!-- Clearly visible Theme Toggle Button -->
          <button 
            id="theme-toggle-btn" 
            class="theme-toggle" 
            type="button" 
            aria-label="${toggleLabel}" 
            title="${toggleLabel}"
          >
            <span class="toggle-icon-wrap">${icon}</span>
            <span class="toggle-text">${modeText}</span>
          </button>

          <!-- User avatar badge -->
          <div class="user-badge" title="Sadia Ramzan (sadiaramzan2468@gmail.com)">
            <span class="avatar-initials">SR</span>
          </div>

          <!-- Mobile hamburger menu button -->
          <button 
            id="mobile-menu-toggle" 
            class="mobile-menu-btn" 
            type="button" 
            aria-label="Toggle Navigation Menu"
            aria-expanded="false"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Dropdown Navigation -->
      <nav id="mobile-nav" class="mobile-nav hidden" aria-label="Mobile Navigation">
        <ul class="mobile-nav-list">
          <li><a href="#overview" class="mobile-nav-item ${activeRoute === 'overview' ? 'active' : ''}">Overview</a></li>
          <li><a href="#new-ticket" class="mobile-nav-item ${activeRoute === 'new-ticket' ? 'active' : ''}">New Ticket</a></li>
          <li><a href="#faq" class="mobile-nav-item ${activeRoute === 'faq' ? 'active' : ''}">Knowledge Base</a></li>
          <li><a href="#settings" class="mobile-nav-item ${activeRoute === 'settings' ? 'active' : ''}">Settings</a></li>
        </ul>
      </nav>
    </header>
  `;
}

export function bindHeaderEvents(container: HTMLElement, _onNavigate: (route: PageRoute) => void): void {
  const themeBtn = container.querySelector<HTMLButtonElement>('#theme-toggle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      toggleTheme();
    });
  }

  const mobileToggle = container.querySelector<HTMLButtonElement>('#mobile-menu-toggle');
  const mobileNav = container.querySelector<HTMLElement>('#mobile-nav');
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      const isHidden = mobileNav.classList.toggle('hidden');
      mobileToggle.setAttribute('aria-expanded', (!isHidden).toString());
    });
  }

  // Handle mobile nav links
  const mobileLinks = container.querySelectorAll<HTMLAnchorElement>('.mobile-nav-item');
  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (mobileNav) {
        mobileNav.classList.add('hidden');
      }
    });
  });
}
