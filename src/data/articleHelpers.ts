// src/data/articleHelpers.ts
import type { CollectionEntry } from 'astro:content';

// Rozszerzony typ artykułu z gotowymi linkami
export type ProcessedArticle = CollectionEntry<'articles'> & {
  href: string;
  target?: string;
  rel?: string;
};

// Typ dla cyklu
export type ArticleCycle = {
  cycleName: string;
  articles: ProcessedArticle[];
};

// Typ zbiorczy zwracany przez helper
export type ArticlesBySource = {
  naszDziennik: ProcessedArticle[];
  niedziela: ProcessedArticle[];
  inne: ProcessedArticle[];
  filary: ProcessedArticle[];
  cycles: ArticleCycle[];
  totalArticles: number;
};

// Funkcja przetwarzająca pojedynczy artykuł (dodaje logiczny href)
function processArticle(art: CollectionEntry<'articles'>): ProcessedArticle {
  const isExternal = !!art.data.externalLink;
  // W nowym Astro używamy art.id. Usuwamy rozszerzenie .md, aby link był czysty
  const slug = art.id.replace(/\.md$/, '');
  
  return {
    ...art,
    href: isExternal ? art.data.externalLink! : `/publikacje/${slug}`,
    target: isExternal ? '_blank' : undefined,
    rel: isExternal ? 'noopener noreferrer' : undefined,
  };
}

// Główna funkcja przetwarzająca pobrane artykuły
export function processArticles(allArticles: CollectionEntry<'articles'>[]): ArticlesBySource {
  // 1. Sortowanie globalne (od najnowszego)
  const sorted = [...allArticles].sort((a, b) => 
    b.data.dateSortable.localeCompare(a.data.dateSortable)
  );

  // 2. Mapowanie na ProcessedArticle (z poprawnymi linkami)
  const processed = sorted.map(processArticle);

  // 3. Filtrowanie do zakładek (artykuły niezwiązane z cyklem)
  const standaloneArticles = processed.filter(a => !a.data.cycle);

  const result: ArticlesBySource = {
    naszDziennik: standaloneArticles.filter(a => a.data.source === 'Nasz Dziennik'),
    niedziela: standaloneArticles.filter(a => a.data.source === 'Niedziela'),
    inne: standaloneArticles.filter(a => a.data.source === 'Inne'),
    filary: standaloneArticles.filter(a => a.data.source === 'Filary'),
    cycles: [],
    totalArticles: allArticles.length,
  };

  // 4. Grupowanie cykli
  const cycleMap = new Map<string, ProcessedArticle[]>();
  
  processed.forEach(art => {
    if (art.data.cycle) {
      const cycleName = art.data.cycle;
      if (!cycleMap.has(cycleName)) {
        cycleMap.set(cycleName, []);
      }
      cycleMap.get(cycleName)!.push(art);
    }
  });

  // Sortowanie artykułów wewnątrz cyklu i dodanie do wyniku
  cycleMap.forEach((articles, cycleName) => {
    const sortedCycleArticles = articles.sort((a, b) => 
      (a.data.cycleOrder ?? 0) - (b.data.cycleOrder ?? 0)
    );
    result.cycles.push({
      cycleName,
      articles: sortedCycleArticles,
    });
  });

  // Sortowanie samych cykli po dacie najnowszego artykułu w cyklu
  result.cycles.sort((a, b) => {
    const dateA = a.articles[0]?.data.dateSortable ?? '';
    const dateB = b.articles[0]?.data.dateSortable ?? '';
    return dateB.localeCompare(dateA);
  });

  return result;
}
