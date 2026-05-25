import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import font from '@astrojs/font';

export default defineConfig({
  output: 'static',
  
  // Czcionki przez oficjalną integrację Astro
  integrations: [
    font({
      families: [
        {
          name: 'Playfair Display',
          cssVariable: '--font-heading', // Zmienna dla nagłówków i cytatów
          weights: ['400', '700'],
          styles: ['normal', 'italic'],
        },
        {
          name: 'Inter',
          cssVariable: '--font-body', // Zmienna dla tekstów
          weights: ['400', '500', '600'],
          styles: ['normal'],
        },
      ],
    }),
  ],

  // Tailwind v4 — przez Vite plugin
  vite: {
    plugins: [tailwindcss()],
  },

  // Ustawienia wielojęzyczności
  i18n: {
    defaultLocale: 'pl',
    locales: ['pl', 'en', 'de'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
