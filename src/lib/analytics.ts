// Google Analytics Event Tracking Helpers
// Use these functions to track user interactions

/**
 * Track a custom event
 * @param action - The action name (e.g., 'click', 'submit', 'view')
 * @param category - The category (e.g., 'CTA', 'Form', 'Navigation')
 * @param label - Optional label for more context
 * @param value - Optional numeric value
 */
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

/**
 * Track CTA button clicks
 * @param ctaName - Name of the CTA (e.g., 'Get Started', 'Contact Us')
 * @param location - Where on the page (e.g., 'Hero', 'Header', 'Footer')
 */
export const trackCTAClick = (ctaName: string, location: string) => {
  trackEvent("cta_click", "CTA", `${ctaName} - ${location}`);
};

/**
 * Track form submissions
 * @param formName - Name of the form (e.g., 'Contact Form', 'Newsletter')
 */
export const trackFormSubmit = (formName: string) => {
  trackEvent("form_submit", "Form", formName);
};

/**
 * Track language switch
 * @param fromLocale - Previous language
 * @param toLocale - New language
 */
export const trackLanguageSwitch = (fromLocale: string, toLocale: string) => {
  trackEvent("language_switch", "Localization", `${fromLocale} → ${toLocale}`);
};

/**
 * Track outbound link clicks
 * @param url - The destination URL
 * @param linkText - The text of the link
 */
export const trackOutboundLink = (url: string, linkText?: string) => {
  trackEvent("click", "Outbound Link", linkText || url);
};

// Extend window type for TypeScript
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}

