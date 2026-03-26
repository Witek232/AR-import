// ==========================================
// TYPY TYPESCRIPT
// ==========================================

export interface Ustawienia {
  tytulStrony: string
  opisStrony: string
  emailKontaktowy: string
  telefon: string
  adres: string
  facebook: string
  youtube: string
  ogImage: string
}

export interface Wydarzenie {
  _id: string
  tytul: string
  tytulEN?: string
  tytulDE?: string
  slug: string
  data: string
  miejsce: string
  typ: 'wyklad' | 'seminarium' | 'konferencja' | 'sympozjum' | 'warsztaty' | 'spotkanie'
  status: 'upcoming' | 'past'
  jezyki?: string[]
  opis?: any[]
  opisEN?: any[]
  zdjecie?: string
  linkRelacji?: string
  seo?: SEO
}

export interface Galeria {
  _id: string
  tytul: string
  tytulEN?: string
  slug: string
  rok: number
  opis?: any[]
  opisEN?: any[]
  okladka?: string
  zdjecia?: Zdjecie[]
  seo?: SEO
}

export interface Zdjecie {
  url: string
  width: number
  height: number
  podpis?: string
  podpisEN?: string
  alt?: string
}

export interface Multimedia {
  _id: string
  tytul: string
  tytulEN?: string
  slug: string
  rok: number
  data: string
  miejsce: string
  kategoria: 'wyklad' | 'seminarium' | 'konferencja' | 'inne'
  tagi?: string[]
  opis?: any[]
  opisEN?: any[]
  czesci?: YoutubeEmbed[]
  seo?: SEO
}

export interface YoutubeEmbed {
  youtubeId: string
  label: string
  czas?: string
  opisCzesci?: string
}

export interface Artykul {
  _id: string
  tytul: string
  tytulEN?: string
  slug: string
  data: string
  zrodlo: string
  streszczenie?: string
  streszecenieEN?: string
  tresc?: any[]
  trescEN?: any[]
  czasCzytania?: number
  linkZewnetrzny?: string
  zdjecie?: string
  kategoria?: Kategoria
  seo?: SEO
}

export interface Kategoria {
  _id?: string
  nazwa: string
  nazwaEN?: string
  slug: string
  opis?: string
}

export interface Nawigacja {
  nazwa: string
  pozycje: PozycjaMenu[]
}

export interface PozycjaMenu {
  etykieta: string
  etykietaEN?: string
  etykietaDE?: string
  href: string
  podpozycje?: {
    etykieta: string
    href: string
  }[]
}

export interface SEO {
  metaTytul?: string
  metaOpis?: string
  metaTytulEN?: string
  metaOpisEN?: string
}
