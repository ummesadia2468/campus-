import { getCurrentTheme, applyTheme } from '../theme';
import type { Theme } from '../types';

export function renderSettingsPage(): string {
  const currentTheme = getCurrentTheme();

  return `
    <div class="page-container settings-page">
      <div class="page-header">
        <div class="page-header-text">
          <h1 class="page-title">Portal Preferences</h1>
          <p class="page-description">Customize your display appearance, contrast settings, and notification choices.</p>
        </div>
      </div>

      <div class="settings-grid">
        <!-- Appearance & Theme Card -->
        <section class="dashboard-card settings-card" aria-label="Appearance Settings">
          <div class="settings-card-header">
            <div class="settings-card-icon">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line></svg>
            </div>
            <div>
              <h2>Appearance & Color Theme</h2>
              <p class="section-hint">Select how the Campus Help Desk Dashboard appears on this device. Preference is automatically saved.</p>
            </div>
          </div>

          <div class="theme-selection-grid">
            <!-- Light Option -->
            <label class="theme-choice-card ${currentTheme === 'light' ? 'selected' : ''}" for="theme-opt-light">
              <input type="radio" name="theme-radio" id="theme-opt-light" value="light" ${currentTheme === 'light' ? 'checked' : ''} />
              <div class="theme-preview light-preview">
                <div class="preview-header"></div>
                <div class="preview-body">
                  <div class="preview-line long"></div>
                  <div class="preview-line short"></div>
                </div>
              </div>
              <div class="choice-meta">
                <span class="choice-title">Light Mode</span>
                <span class="choice-desc">Clean, high-contrast light theme for bright spaces</span>
              </div>
            </label>

            <!-- Dark Option -->
            <label class="theme-choice-card ${currentTheme === 'dark' ? 'selected' : ''}" for="theme-opt-dark">
              <input type="radio" name="theme-radio" id="theme-opt-dark" value="dark" ${currentTheme === 'dark' ? 'checked' : ''} />
              <div class="theme-preview dark-preview">
                <div class="preview-header"></div>
                <div class="preview-body">
                  <div class="preview-line long"></div>
                  <div class="preview-line short"></div>
                </div>
              </div>
              <div class="choice-meta">
                <span class="choice-title">Dark Mode</span>
                <span class="choice-desc">Low-glare dark theme optimized for eye comfort</span>
              </div>
            </label>
          </div>
        </section>

        <!-- User Profile Card -->
        <section class="dashboard-card settings-card" aria-label="Profile Info">
          <div class="settings-card-header">
            <div class="settings-card-icon">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
            <div>
              <h2>Authenticated Account</h2>
              <p class="section-hint">Profile linked to your campus Jira help desk account.</p>
            </div>
          </div>

          <div class="profile-details-box">
            <div class="profile-avatar-large">SR</div>
            <div class="profile-meta">
              <div class="profile-name">Sadia Ramzan</div>
              <div class="profile-email">sadiaramzan2468@gmail.com</div>
              <div class="profile-org">Campus Help Desk • Student & Faculty Services</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  `;
}

export function bindSettingsEvents(container: HTMLElement): void {
  const radioButtons = container.querySelectorAll<HTMLInputElement>('input[name="theme-radio"]');

  radioButtons.forEach((radio) => {
    radio.addEventListener('change', () => {
      const selected = radio.value as Theme;
      applyTheme(selected);

      // Update card active styles
      container.querySelectorAll('.theme-choice-card').forEach((card) => {
        card.classList.remove('selected');
      });
      radio.closest('.theme-choice-card')?.classList.add('selected');
    });
  });
}
