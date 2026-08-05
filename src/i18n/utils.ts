import { ui, defaultLang, langPrefix, type Lang, type UiKey } from './ui';

const LANG_CODES: Lang[] = ['pl', 'en', 'de', 'es', 'it'];

/** Wykrywa język z ścieżki URL (`/en/...` → en). */
export function getLangFromUrl(url: URL | string): Lang {
  const pathname = typeof url === 'string' ? url : url.pathname;
  const seg = pathname.replace(/^\//, '').split('/')[0];
  if (seg && (LANG_CODES as string[]).includes(seg) && seg !== 'pl') {
    return seg as Lang;
  }
  return defaultLang;
}

/** Ścieżka bez prefiksu locale (`/en/multimedia` → `/multimedia`). */
export function stripLangPrefix(pathname: string): string {
  const lang = getLangFromUrl(pathname);
  if (lang === defaultLang) return pathname || '/';
  const prefix = langPrefix[lang];
  if (pathname === prefix || pathname === prefix + '/') return '/';
  if (pathname.startsWith(prefix + '/')) return pathname.slice(prefix.length) || '/';
  return pathname;
}

/**
 * Buduje URL w danym języku.
 * Podstrony bez tłumaczenia → PL (unikamy 404).
 * forceLocale: zawsze prefiks (homepage i kotwice).
 */
export function localePath(
  path: string,
  lang: Lang,
  opts: { forceLocale?: boolean; translatedPaths?: string[] } = {},
): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const [pathname, search = ''] = clean.split('?');
  const hashIdx = pathname.indexOf('#');
  const pathOnly = hashIdx >= 0 ? pathname.slice(0, hashIdx) : pathname;
  const hash = hashIdx >= 0 ? pathname.slice(hashIdx) : '';
  const q = search ? `?${search}` : '';

  if (lang === defaultLang) {
    return `${pathOnly === '' ? '/' : pathOnly}${q}${hash}`;
  }

  const translated =
    opts.forceLocale ||
    pathOnly === '/' ||
    pathOnly === '' ||
    (opts.translatedPaths ?? ['/']).some(
      (p) => pathOnly === p || pathOnly.startsWith(p + '/'),
    );

  if (!translated) {
    return `${pathOnly}${q}${hash}`;
  }

  const prefix = langPrefix[lang];
  if (pathOnly === '/' || pathOnly === '') return `${prefix || '/'}${q}${hash}`;
  return `${prefix}${pathOnly}${q}${hash}`;
}

/** t(key) z fallbackiem do PL. */
export function useTranslations(lang: Lang) {
  return function t(key: UiKey): string {
    const table = ui[lang as keyof typeof ui] as Record<string, string> | undefined;
    if (table && key in table) return table[key];
    const fallback = ui[defaultLang] as Record<string, string>;
    return fallback[key] ?? key;
  };
}

/**
 * Ścieżki już przetłumaczone (homepage w EN/DE/ES/IT).
 * Rozszerzaj przy kolejnych podstronach, np. '/contact'.
 */
export const TRANSLATED_PATHS = [
  '/',
  '/synteza-wiary-i-rozumu',
  '/ks-guz',
  '/emanacja-jerozolimy-w-nauczaniu-ks-prof-tadeusza-guza',
  '/emanacja-aten-w-nauczaniu-ks-prof-tadeusza-guza',
  '/emanacja-rzymu-w-nauczaniu-ks-prof-tadeusza-guza',
];

/** @deprecated użyj TRANSLATED_PATHS */
export const EN_TRANSLATED_PATHS = TRANSLATED_PATHS;

export function homePath(lang: Lang): string {
  return langPrefix[lang] || '/';
}
