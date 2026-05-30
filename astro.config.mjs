import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://atenyroztocza.pl', // DODANA DOMENA DOCELOWA - kluczowe dla SEO i canonical!
  output: 'static',
  vite: {
    plugins: [tailwindcss()], // Tailwind v4 — przez Vite plugin, nie integrację
  },
  i18n: {
    defaultLocale: 'pl',
    locales: ['pl', 'en', 'de'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
