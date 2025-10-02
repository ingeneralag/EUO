import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
  // This is required by next-intl to work with the middleware
  let locale = await requestLocale;

  // Validate that the incoming `locale` parameter is valid
  if (!locale || !["en", "it", "es", "de"].includes(locale)) {
    locale = "en";
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});


