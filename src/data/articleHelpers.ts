// src/data/articleHelpers.ts
import type { CollectionEntry } from 'astro:content';

export type ProcessedArticle = CollectionEntry<'articles'> & {
  href: string;
  target?: string;
  rel?: string;
};

export type ProcessedCycle = CollectionEntry<'cycles'> & {
  href: string;
  articles: ProcessedArticle[];
};

export type ArticlesBySource = {
  naszDziennik: ProcessedArticle[];
  niedziela: ProcessedArticle[];
  inne: ProcessedArticle[];
  filary: ProcessedArticle[];
  cycles: ProcessedCycle[];
  totalArticles: number;
};

function processArticle(art: CollectionEntry<'articles'>): ProcessedArticle {
  const isExternal = !!art.data.externalLink;
  const slug = art.id.replace(/\.md$/, '');
  return {
    ...art,
    href: isExternal ? art.data.externalLink! : `/publikacje/${slug}`,
    target: isExternal ? '_blank' : undefined,
    rel: isExternal ? 'noopener noreferrer' : undefined,
  };
}

export function processArticles(
  allArticles: CollectionEntry<'articles'>[],
  allCycles: CollectionEntry<'cycles'>[]
): ArticlesBySource {
  const sorted = [...allArticles].sort((a, b) => 
    b.data.dateSortable.localeCompare(a.data.dateSortable)
  );

  const processed = sorted.map(processArticle);
  const standaloneArticles = processed.filter(a => !a.data.cycle);

  const result: ArticlesBySource = {
    naszDziennik: standaloneArticles.filter(a => a.data.source === 'Nasz Dziennik'),
    niedziela: standaloneArticles.filter(a => a.data.source === 'Niedziela'),
    inne: standaloneArticles.filter(a => a.data.source === 'Inne'),
    filary: standaloneArticles.filter(a => a.data.source === 'Filary'),
    cycles: [],
    totalArticles: allArticles.length,
  };

  // Grupowanie cykli na podstawie kolekcji 'cycles'
  allCycles.forEach(cycleEntry => {
    const cycleSlug = cycleEntry.id.replace(/\.md$/, '');
    
    // Filtrowanie i sortowanie artykułów dla TEGO cyklu
    const cycleArticles = processed
      .filter(a => a.data.cycle === cycleSlug)
      .sort((a, b) => (a.data.cycleOrder ?? 0) - (b.data.cycleOrder ?? 0));

    if (cycleArticles.length > 0) {
      result.cycles.push({
        ...cycleEntry,
        href: `/cykle/${cycleSlug}`, // Link do strony cyklu
        articles: cycleArticles,
      });
    }
  });

  // Sortowanie kafelków cykli po opcjonalnym polu 'order', lub po dacie najnowszego artykułu
  result.cycles.sort((a, b) => {
    if (a.data.order !== undefined && b.data.order !== undefined) {
      return a.data.order - b.data.order;
    }
    const dateA = a.articles[0]?.data.dateSortable ?? '';
    const dateB = b.articles[0]?.data.dateSortable ?? '';
    return dateB.localeCompare(dateA);
  });

  return result;
}

// NOWA FUNKCJA: Zwraca nawigację wewnątrz cyklu dla danego artykułu
export function getCycleNavigation(article: ProcessedArticle, allProcessedCycles: ProcessedCycle[]) {
  if (!article.data.cycle) return { prev: null, next: null, cycleData: null };

  const cycleData = allProcessedCycles.find(c => c.id.replace(/\.md$/, '') === article.data.cycle);
  if (!cycleData) return { prev: null, next: null, cycleData: null };

  const currentIndex = cycleData.articles.findIndex(a => a.id === article.id);

  return {
    prev: currentIndex > 0 ? cycleData.articles[currentIndex - 1] : null,
    next: currentIndex < cycleData.articles.length - 1 ? cycleData.articles[currentIndex + 1] : null,
    cycleData: cycleData,
  };
}
