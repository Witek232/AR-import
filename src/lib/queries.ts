// ==========================================
// ZAPYTANIA GROQ - pobieranie danych z Sanity
// ==========================================

// Ustawienia strony (singleton)
export const QUERY_USTAWIENIA = `
  *[_type == "ustawieniaStrony"][0] {
    tytulStrony,
    opisStrony,
    emailKontaktowy,
    telefon,
    adres,
    facebook,
    youtube,
    "ogImage": ogImage.asset->url
  }
`

// Lista wydarzeń
export const QUERY_WYDARZENIA = `
  *[_type == "wydarzenie"] | order(data desc) {
    _id,
    tytul,
    "slug": slug.current,
    data,
    miejsce,
    typ,
    status,
    "zdjecie": zdjecie.asset->url,
    streszczenie
  }
`

// Pojedyncze wydarzenie po slug
export const QUERY_WYDARZENIE_BY_SLUG = `
  *[_type == "wydarzenie" && slug.current == $slug][0] {
    _id,
    tytul,
    tytulEN,
    tytulDE,
    "slug": slug.current,
    data,
    miejsce,
    typ,
    status,
    jezyki,
    opis,
    opisEN,
    opisDE,
    "zdjecie": zdjecie.asset->url,
    linkRelacji,
    seo
  }
`

// Lista galerii
export const QUERY_GALERIE = `
  *[_type == "galeria"] | order(rok desc) {
    _id,
    tytul,
    "slug": slug.current,
    rok,
    "okladka": okladka.asset->url
  }
`

// Pojedyncza galeria ze zdjęciami
export const QUERY_GALERIA_BY_SLUG = `
  *[_type == "galeria" && slug.current == $slug][0] {
    _id,
    tytul,
    tytulEN,
    "slug": slug.current,
    rok,
    opis,
    opisEN,
    "okladka": okladka.asset->url,
    zdjecia[] {
      "url": plik.asset->url,
      "width": plik.asset->metadata.dimensions.width,
      "height": plik.asset->metadata.dimensions.height,
      podpis,
      podpisEN,
      alt
    },
    seo
  }
`

// Lista multimediów
export const QUERY_MULTIMEDIA = `
  *[_type == "materialAudiowizualny"] | order(data desc) {
    _id,
    tytul,
    "slug": slug.current,
    rok,
    data,
    miejsce,
    kategoria,
    tagi
  }
`

// Pojedynczy materiał multimedialny
export const QUERY_MULTIMEDIA_BY_SLUG = `
  *[_type == "materialAudiowizualny" && slug.current == $slug][0] {
    _id,
    tytul,
    tytulEN,
    "slug": slug.current,
    rok,
    data,
    miejsce,
    kategoria,
    tagi,
    opis,
    opisEN,
    czesci[] {
      youtubeId,
      label,
      czas,
      opisCzesci
    },
    seo
  }
`

// Lista artykułów
export const QUERY_ARTYKULY = `
  *[_type == "artykul"] | order(data desc) {
    _id,
    tytul,
    "slug": slug.current,
    data,
    zrodlo,
    streszczenie,
    czasCzytania,
    "zdjecie": zdjecie.asset->url,
    "kategoria": kategoria->nazwa
  }
`

// Pojedynczy artykuł
export const QUERY_ARTYKUL_BY_SLUG = `
  *[_type == "artykul" && slug.current == $slug][0] {
    _id,
    tytul,
    tytulEN,
    "slug": slug.current,
    data,
    zrodlo,
    streszczenie,
    streszecenieEN,
    tresc,
    trescEN,
    czasCzytania,
    linkZewnetrzny,
    "zdjecie": zdjecie.asset->url,
    "kategoria": kategoria->{nazwa, nazwaEN, "slug": slug.current},
    seo
  }
`

// Kategorie
export const QUERY_KATEGORIE = `
  *[_type == "kategoria"] | order(nazwa asc) {
    _id,
    nazwa,
    nazwaEN,
    "slug": slug.current,
    opis
  }
`

// Nawigacja
export const QUERY_NAWIGACJA = `
  *[_type == "nawigacja" && slug.current == $slug][0] {
    nazwa,
    pozycje[] {
      etykieta,
      etykietaEN,
      etykietaDE,
      href,
      podpozycje[] {
        etykieta,
        href
      }
    }
  }
`
