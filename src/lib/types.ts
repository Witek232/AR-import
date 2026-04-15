// src/lib/types.ts
// Typy używane przez strony i komponenty.
// Nie zawierają żadnych zależności od CMS — dane pochodzą z Content Collections.

export interface Zdjecie {
  src:     string;
  width?:  number;
  height?: number;
  podpis?: string;
  alt?:    string;
}

export interface Album {
  id:     string;
  title:  string;
  year:   string;
  count:  number;
  cover:  string;
  photos: Zdjecie[];
}

export interface YoutubeEmbed {
  id:          string;
  label:       string;
  duration:    string;
  description?: string;
}

export interface SEO {
  metaTytul?: string;
  metaOpis?:  string;
}
