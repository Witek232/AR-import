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
 * Domyślnie podstrony bez tłumaczenia prowadzą do PL (avoid 404).
 * `forceLocale: true` zawsze dokłada prefiks (np. homepage EN).
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
    // jeszcze brak EN podstrony → PL
    return `${pathOnly}${q}${hash}`;
  }

  const prefix = langPrefix[lang];
  if (pathOnly === '/' || pathOnly === '') return `${prefix || '/'}${q}${hash}`;
  return `${prefix}${pathOnly}${q}${hash}`;
}

/** Funkcja t(key) dla danego języka z fallbackiem do PL / klucza. */
export function useTranslations(lang: Lang) {
  return function t(key: UiKey): string {
    const table = ui[lang as keyof typeof ui] as Record<string, string> | undefined;
    if (table && key in table) return table[key];
    const fallback = ui[defaultLang] as Record<string, string>;
    return fallback[key] ?? key;
  };
}

/** Ścieżki już dostępne w EN (rozszerzaj przy kolejnych stronach). */
export const EN_TRANSLATED_PATHS = ['/'];
