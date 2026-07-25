// Language Switching Module
const LanguageSwitcher = {
  // Available languages
  LANGUAGES: {
    EN: 'en',
    AR: 'ar'
  },

  // Get current language from localStorage or browser default
  getCurrentLanguage() {
    const stored = localStorage.getItem('appLanguage');
    if (stored) return stored;
    
    // Check browser language
    const browserLang = navigator.language || navigator.userLanguage;
    return browserLang.startsWith('ar') ? this.LANGUAGES.AR : this.LANGUAGES.EN;
  },

  // Set language and apply it
  setLanguage(lang) {
    if (!Object.values(this.LANGUAGES).includes(lang)) {
      console.warn('Invalid language:', lang);
      return;
    }

    // Save to localStorage
    localStorage.setItem('appLanguage', lang);

    // Update document
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === this.LANGUAGES.AR ? 'rtl' : 'ltr';

    // Update language button text
    this.updateLanguageButton(lang);

    // Translate all elements on the page
    if (typeof translatePage === 'function') {
      translatePage(lang);
    }

    // Trigger custom event for other scripts
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
  },

  // Toggle between languages
  toggleLanguage() {
    const current = this.getCurrentLanguage();
    const newLang = current === this.LANGUAGES.EN ? this.LANGUAGES.AR : this.LANGUAGES.EN;
    this.setLanguage(newLang);
  },

  // Update the language button display
  updateLanguageButton(lang) {
    const buttons = document.querySelectorAll('[data-lang-toggle]');
    buttons.forEach(btn => {
      if (lang === this.LANGUAGES.EN) {
        btn.innerHTML = '<i class="bi bi-globe"></i> AR | EN';
        btn.setAttribute('title', 'Switch to Arabic');
      } else {
        btn.innerHTML = '<i class="bi bi-globe"></i> EN | AR';
        btn.setAttribute('title', 'Switch to English');
      }
    });
  },

  // Initialize on page load
  init() {
    const lang = this.getCurrentLanguage();
    this.setLanguage(lang);

    // Add click listeners to language toggle buttons
    const buttons = document.querySelectorAll('[data-lang-toggle]');
    buttons.forEach(btn => {
      btn.style.cursor = 'pointer';
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleLanguage();
      });
    });
  }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => LanguageSwitcher.init());
} else {
  LanguageSwitcher.init();
}
