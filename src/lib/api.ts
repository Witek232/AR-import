import { client } from './sanity'
import * as queries from './queries'
import type {
  Ustawienia,
  Wydarzenie,
  Galeria,
  Multimedia,
  Artykul,
  Kategoria,
  Nawigacja,
} from './types'

// ==========================================
// FUNKCJE POMOCNICZE - łatwe pobieranie danych
// ==========================================

// Ustawienia strony
export async function getUstawienia(): Promise<Ustawienia> {
  return client.fetch(queries.QUERY_USTAWIENIA)
}

// Wydarzenia
export async function getWydarzenia(): Promise<Wydarzenie[]> {
  return client.fetch(queries.QUERY_WYDARZENIA)
}

export async function getWydarzenie(slug: string): Promise<Wydarzenie | null> {
  return client.fetch(queries.QUERY_WYDARZENIE_BY_SLUG, { slug })
}

// Galerie
export async function getGalerie(): Promise<Galeria[]> {
  return client.fetch(queries.QUERY_GALERIE)
}

export async function getGaleria(slug: string): Promise<Galeria | null> {
  return client.fetch(queries.QUERY_GALERIA_BY_SLUG, { slug })
}

// Multimedia
export async function getMultimedia(): Promise<Multimedia[]> {
  return client.fetch(queries.QUERY_MULTIMEDIA)
}

export async function getMultimediaItem(slug: string): Promise<Multimedia | null> {
  return client.fetch(queries.QUERY_MULTIMEDIA_BY_SLUG, { slug })
}

// Artykuły
export async function getArtykuly(): Promise<Artykul[]> {
  return client.fetch(queries.QUERY_ARTYKULY)
}

export async function getArtykul(slug: string): Promise<Artykul | null> {
  return client.fetch(queries.QUERY_ARTYKUL_BY_SLUG, { slug })
}

// Kategorie
export async function getKategorie(): Promise<Kategoria[]> {
  return client.fetch(queries.QUERY_KATEGORIE)
}

// Nawigacja
export async function getNawigacja(slug: string = 'glowna'): Promise<Nawigacja | null> {
  return client.fetch(queries.QUERY_NAWIGACJA, { slug })
}
