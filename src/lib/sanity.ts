import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: import.meta.env.8bab26y8,
  dataset:   import.meta.env.SANITY_DATASET || 'production',
  useCdn:    true,
  apiVersion: '2024-01-01',
})

// Klient do zapisu (używany tylko przez skrypt importu)
export const writeClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset:   process.env.SANITY_DATASET || 'production',
  token:     process.env.SANITY_TOKEN,
  useCdn:    false,
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// ─── WYDARZENIA ──────────────────────────────────────────────
export async function getWydarzenia() {
  try {
    return await client.fetch(`
      *[_type == "wydarzenie"] | order(data desc) {
        _id, tytul, tytulEN, tytulDE, tytulIT, tytulES,
        slug, data, miejsce, typ, jezyki, hasReport, linkRelacji,
        "zdjecieSrc": zdjecie.asset->url
      }
    `)
  } catch (e) {
    console.error('Sanity getWydarzenia error:', e)
    return []
  }
}

export async function getWydarzenie(slug: string) {
  try {
    return await client.fetch(`
      *[_type == "wydarzenie" && slug.current == $slug][0] {
        _id, tytul, tytulEN, tytulDE, tytulIT, tytulES,
        slug, data, miejsce, typ, jezyki,
        opis, opisEN, opisDE, opisIT, opisES,
        hasReport, linkRelacji,
        "zdjecieSrc": zdjecie.asset->url
      }
    `, { slug })
  } catch (e) {
    console.error('Sanity getWydarzenie error:', e)
    return null
  }
}

// ─── MATERIAŁY AUDIOWIZUALNE ─────────────────────────────────
export async function getLataArchiwum(): Promise<number[]> {
  try {
    const result = await client.fetch(`
      array::unique(*[_type == "materialAudiowizualny"].rok) | order(@ desc)
    `)
    return result ?? []
  } catch (e) {
    console.error('Sanity getLataArchiwum error:', e)
    return []
  }
}

export async function getMaterialyRoku(rok: number) {
  try {
    return await client.fetch(`
      *[_type == "materialAudiowizualny" && rok == $rok] | order(data desc) {
        _id, tytul, slug, rok, data, miejsce, kategoria, tagi,
        "liczbaCzesci": count(czesci),
        "pierwszyCzas": czesci[0].czas
      }
    `, { rok })
  } catch (e) {
    console.error('Sanity getMaterialyRoku error:', e)
    return []
  }
}

export async function getMaterial(rok: number, slug: string) {
  try {
    return await client.fetch(`
      *[_type == "materialAudiowizualny" && rok == $rok && slug.current == $slug][0] {
        _id, tytul, slug, rok, data, miejsce, kategoria, tagi,
        opis, czesci
      }
    `, { rok, slug })
  } catch (e) {
    console.error('Sanity getMaterial error:', e)
    return null
  }
}

// ─── GALERIA ─────────────────────────────────────────────────
export async function getGalerie() {
  try {
    return await client.fetch(`
      *[_type == "galeria"] | order(rok desc) {
        _id, tytul, slug, rok, opis,
        "okladkaSrc": okladka.asset->url,
        "liczbaZdjec": count(zdjecia)
      }
    `)
  } catch (e) {
    console.error('Sanity getGalerie error:', e)
    return []
  }
}

export async function getGaleria(slug: string) {
  try {
    return await client.fetch(`
      *[_type == "galeria" && slug.current == $slug][0] {
        _id, tytul, slug, rok, opis,
        "okladkaSrc": okladka.asset->url,
        "zdjecia": zdjecia[] {
          podpis, alt,
          "src": plik.asset->url,
          "width": plik.asset->metadata.dimensions.width,
          "height": plik.asset->metadata.dimensions.height
        }
      }
    `, { slug })
  } catch (e) {
    console.error('Sanity getGaleria error:', e)
    return null
  }
}
