import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://atenyroztocza.pl',
  output: 'static',
  integrations: [
    sitemap({
      // Generates sitemap-index.xml + sitemap-0.xml in dist/
      i18n: {
        defaultLocale: 'pl',
        locales: {
          pl: 'pl-PL',
          en: 'en',
          de: 'de-DE',
          es: 'es-ES',
          it: 'it-IT',
        },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    defaultLocale: 'pl',
    locales: ['pl', 'en', 'de', 'es', 'it'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
