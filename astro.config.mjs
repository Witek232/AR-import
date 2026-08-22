import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

const MIGRATION_LASTMOD = new Date('2026-08-18'); // data tego wdrożenia

export default defineConfig({
  site: 'https://atenyroztocza.pl',
  output: 'static',
  integrations: [
    sitemap({
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
      serialize(item) {
        item.lastmod = MIGRATION_LASTMOD;
        return item;
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
