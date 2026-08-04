import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://atenyroztocza.pl',
  output: 'static',
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
