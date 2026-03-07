export interface YTPart {
  id:           string;
  label:        string;
  duration:     string;
  description?: string;
}

export interface MultimediaEntry {
  slug:         string;
  title:        string;
  date:         string;
  dateSortable: string;
  place?:       string;
  category:     'wyklad' | 'seminarium' | 'konferencja' | 'inne';
  tags?:        string[];
  description:  string;
  parts:        YTPart[];
  year:         number;
}

export type MultimediaData = Record<number, MultimediaEntry[]>;

export const categoryLabels: Record<string, string> = {
  wyklad:      'Wykład',
  seminarium:  'Seminarium',
  konferencja: 'Konferencja',
  inne:        'Inne',
};

export const categoryColors: Record<string, string> = {
  wyklad:      '#C9A84C',
  seminarium:  '#7A5C2E',
  konferencja: '#8B3A3A',
  inne:        '#4A6741',
};

export const multimediaData: MultimediaData = {
  2026: [
    {
      slug: 'logos-i-poczatek-2026',
      title: 'Logos i Początek — filozofia stworzenia',
      date: '15 marca 2026',
      dateSortable: '2026-03-15',
      place: 'Roztocze',
      category: 'wyklad',
      tags: ['logos', 'stworzenie', 'filozofia'],
      description: 'Wykład o filozoficznym rozumieniu początku w tradycji greckiej i chrześcijańskiej.\nOmówienie relacji między Logosem Heraklita a Prologiem Ewangelii Jana.',
      parts: [
        { id: 'dQw4w9WgXcQ', label: 'Część I', duration: '38:22' },
        { id: 'dQw4w9WgXcQ', label: 'Część II', duration: '41:05' },
      ],
      year: 2026,
    },
  ],
  2025: [
    {
      slug: 'platon-i-dobro-2025',
      title: 'Platon i idea Dobra — u źródeł etyki',
      date: '10 maja 2025',
      dateSortable: '2025-05-10',
      place: 'Lublin, KUL',
      category: 'konferencja',
      tags: ['platon', 'dobro', 'etyka'],
      description: 'Platońska idea Dobra jako fundament etyki i metafizyki w dialogu z tradycją chrześcijańską.\nOmówienie Państwa i Fajdona w kontekście teologii moralnej.',
      parts: [
        { id: 'dQw4w9WgXcQ', label: 'Wykład główny', duration: '55:10' },
        { id: 'dQw4w9WgXcQ', label: 'Dyskusja', duration: '28:33' },
      ],
      year: 2025,
    },
    {
      slug: 'arystoteles-cnota-2025',
      title: 'Arystoteles i cnota jako cel człowieka',
      date: '22 marca 2025',
      dateSortable: '2025-03-22',
      place: 'Roztocze',
      category: 'seminarium',
      tags: ['arystoteles', 'cnota', 'eudaimonia'],
      description: 'Nikomachejska koncepcja cnoty i szczęścia w kontekście chrześcijańskiego ideału świętości.',
      parts: [
        { id: 'dQw4w9WgXcQ', label: 'Seminarium', duration: '1:12:44' },
      ],
      year: 2025,
    },
  ],
  2024: [
    {
      slug: 'fides-et-ratio-jubileusz-2024',
      title: 'Fides et Ratio — 25 lat encykliki',
      date: '8 lutego 2024',
      dateSortable: '2024-02-08',
      place: 'Rzeszów',
      category: 'konferencja',
      tags: ['fides et ratio', 'jan pawel II', 'filozofia'],
      description: 'Jubileuszowe sympozjum z okazji 25-lecia encykliki Jana Pawła II o relacji wiary i rozumu.\nWystąpienia prelegentów z Polski i Włoch.',
      parts: [
        { id: 'dQw4w9WgXcQ', label: 'Otwarcie i referat I', duration: '48:15' },
        { id: 'dQw4w9WgXcQ', label: 'Referat II i dyskusja', duration: '52:30' },
      ],
      year: 2024,
    },
    {
      slug: 'heraklit-logos-2024',
      title: 'Heraklit i Logos — od filozofii do teologii',
      date: '14 listopada 2024',
      dateSortable: '2024-11-14',
      place: 'Roztocze',
      category: 'wyklad',
      tags: ['heraklit', 'logos', 'filozofia'],
      description: 'Heraklitejski Logos a Janowe pojęcie Słowa — ciągłość i przełom w historii myśli.',
      parts: [
        { id: 'dQw4w9WgXcQ', label: 'Wykład', duration: '44:20' },
      ],
      year: 2024,
    },
  ],
  2023: [
    {
      slug: 'tomizm-wspolczesnosc-2023',
      title: 'Tomizm i wyzwania współczesności',
      date: '20 września 2023',
      dateSortable: '2023-09-20',
      place: 'Roztocze',
      category: 'seminarium',
      tags: ['tomizm', 'akwinata', 'metafizyka'],
      description: 'Aktualność myśli Tomasza z Akwinu dla współczesnej filozofii i teologii.\nOmówienie realizmu tomistycznego wobec filozofii analitycznej i fenomenologii.',
      parts: [
        { id: 'dQw4w9WgXcQ', label: 'Część I — Ontologia', duration: '36:50' },
        { id: 'dQw4w9WgXcQ', label: 'Część II — Epistemologia', duration: '39:15' },
        { id: 'dQw4w9WgXcQ', label: 'Dyskusja', duration: '25:40' },
      ],
      year: 2023,
    },
  ],
  2022: [
    {
      slug: 'piekno-droga-do-boga-2022',
      title: 'Piękno jako droga do Boga',
      date: '5 czerwca 2022',
      dateSortable: '2022-06-05',
      place: 'Roztocze',
      category: 'wyklad',
      tags: ['estetyka', 'piękno', 'teologia'],
      description: 'Platońska kalokagathia a chrześcijańska teologia piękna w liturgii i sztuce sakralnej.',
      parts: [
        { id: 'dQw4w9WgXcQ', label: 'Wykład', duration: '50:12' },
      ],
      year: 2022,
    },
  ],
  2021: [
    {
      slug: 'europa-chrzescijanskie-korzenie-2021',
      title: 'Europa a jej chrześcijańskie korzenie',
      date: '15 maja 2021',
      dateSortable: '2021-05-15',
      place: 'Online',
      category: 'konferencja',
      tags: ['europa', 'cywilizacja', 'tożsamość'],
      description: 'Tożsamość Europy i spór o jej fundament cywilizacyjny — refleksja filozoficzna i teologiczna.',
      parts: [
        { id: 'dQw4w9WgXcQ', label: 'Konferencja', duration: '1:05:30' },
      ],
      year: 2021,
    },
  ],
  2020: [
    {
      slug: 'sokrates-maieutyka-2020',
      title: 'Sokrates i maieutyka — sztuka rodzenia prawdy',
      date: '8 marca 2020',
      dateSortable: '2020-03-08',
      place: 'Roztocze',
      category: 'wyklad',
      tags: ['sokrates', 'maieutyka', 'dialog'],
      description: 'Sokratejska metoda dialogiczna jako wzorzec nauczania i poszukiwania prawdy.',
      parts: [
        { id: 'dQw4w9WgXcQ', label: 'Wykład', duration: '47:18' },
      ],
      year: 2020,
    },
  ],
  2019: [
    {
      slug: 'rzym-prawo-naturalne-2019',
      title: 'Rzym i prawo naturalne',
      date: '18 października 2019',
      dateSortable: '2019-10-18',
      place: 'Zamość',
      category: 'konferencja',
      tags: ['rzym', 'prawo', 'cywilizacja'],
      description: 'Rzymski geniusz prawa i jego recepcja w europejskiej tradycji prawniczej i moralnej.',
      parts: [
        { id: 'dQw4w9WgXcQ', label: 'Referat', duration: '43:55' },
        { id: 'dQw4w9WgXcQ', label: 'Dyskusja', duration: '22:10' },
      ],
      year: 2019,
    },
  ],
  2018: [
    {
      slug: 'augustyn-czas-wiecznosc-2018',
      title: 'Augustyn — czas, wieczność i pamięć',
      date: '12 kwietnia 2018',
      dateSortable: '2018-04-12',
      place: 'Roztocze',
      category: 'seminarium',
      tags: ['augustyn', 'czas', 'wieczność'],
      description: 'Augustyńska filozofia czasu w Wyznaniach — wewnętrzne odczuwanie czasu wobec wieczności Boga.',
      parts: [
        { id: 'dQw4w9WgXcQ', label: 'Seminarium', duration: '1:08:22' },
      ],
      year: 2018,
    },
  ],
  2017: [
    {
      slug: 'biblia-filozofia-grecka-2017',
      title: 'Biblia i filozofia grecka — dialog czy napięcie',
      date: '9 września 2017',
      dateSortable: '2017-09-09',
      place: 'Roztocze',
      category: 'wyklad',
      tags: ['biblia', 'filozofia', 'dialog'],
      description: 'Relacja między objawieniem biblijnym a grecką filozofią w myśli patrystycznej i scholastycznej.',
      parts: [
        { id: 'dQw4w9WgXcQ', label: 'Wykład I', duration: '40:15' },
        { id: 'dQw4w9WgXcQ', label: 'Wykład II', duration: '38:50' },
      ],
      year: 2017,
    },
  ],
  2016: [
    {
      slug: 'plotyn-jednia-2016',
      title: 'Plotyn i Jednia — neoplatonizm i mistyka',
      date: '22 maja 2016',
      dateSortable: '2016-05-22',
      place: 'Roztocze',
      category: 'seminarium',
      tags: ['plotyn', 'neoplatonizm', 'mistyka'],
      description: 'Plotyńska koncepcja Jedni i drogi powrotu duszy — neoplatonizm a chrześcijańska mistyka.',
      parts: [
        { id: 'dQw4w9WgXcQ', label: 'Wykład', duration: '55:30' },
      ],
      year: 2016,
    },
  ],
  2015: [
    {
      slug: 'jan-pawel-filozofia-2015',
      title: 'Jan Paweł II a dziedzictwo filozofii antycznej',
      date: '16 października 2015',
      dateSortable: '2015-10-16',
      place: 'Lublin',
      category: 'konferencja',
      tags: ['jan pawel II', 'filozofia', 'humanizm'],
      description: 'Jak Karol Wojtyła rozumiał rolę filozofii antycznej w kształtowaniu chrześcijańskiego humanizmu.',
      parts: [
        { id: 'dQw4w9WgXcQ', label: 'Referat główny', duration: '48:40' },
      ],
      year: 2015,
    },
  ],
  2014: [
    {
      slug: 'summa-theologiae-2014',
      title: 'Summa Theologiae — architektura myśli',
      date: '7 marca 2014',
      dateSortable: '2014-03-07',
      place: 'Roztocze',
      category: 'wyklad',
      tags: ['tomasz', 'summa', 'teologia'],
      description: 'Struktura i metoda Sumy Teologicznej Tomasza z Akwinu — synteza filozofii i teologii.',
      parts: [
        { id: 'dQw4w9WgXcQ', label: 'Wykład', duration: '1:02:15' },
      ],
      year: 2014,
    },
  ],
  2013: [
    {
      slug: 'jezyk-milczenie-logos-2013',
      title: 'Język i milczenie — dwa oblicza Logosu',
      date: '25 maja 2013',
      dateSortable: '2013-05-25',
      place: 'Roztocze',
      category: 'seminarium',
      tags: ['logos', 'język', 'milczenie'],
      description: 'Filozofia języka a teologia Słowa — od Heraklita przez Platona do Jana Ewangelisty.',
      parts: [
        { id: 'dQw4w9WgXcQ', label: 'Część I', duration: '35:20' },
        { id: 'dQw4w9WgXcQ', label: 'Część II', duration: '32:45' },
      ],
      year: 2013,
    },
  ],
  2012: [
    {
      slug: 'scholastyka-arystoteles-2012',
      title: 'Scholastyka i powrót do Arystotelesa',
      date: '6 kwietnia 2012',
      dateSortable: '2012-04-06',
      place: 'Roztocze',
      category: 'wyklad',
      tags: ['scholastyka', 'arystoteles', 'średniowiecze'],
      description: 'Recepcja arystotelizmu w myśli średniowiecznej — od al-Farabi i Awerroesa do Akwinaty.',
      parts: [
        { id: 'dQw4w9WgXcQ', label: 'Wykład', duration: '52:30' },
      ],
      year: 2012,
    },
  ],
  2011: [
    {
      slug: 'tradycja-zywa-pamiec-2011',
      title: 'Tradycja jako żywa pamięć',
      date: '17 września 2011',
      dateSortable: '2011-09-17',
      place: 'Roztocze',
      category: 'seminarium',
      tags: ['tradycja', 'pamięć', 'tożsamość'],
      description: 'Tradycja nie jest martwym balastem przeszłości, lecz żywą pamięcią kształtującą tożsamość.\nRola paradosis w Kościele i kulturze.',
      parts: [
        { id: 'dQw4w9WgXcQ', label: 'Seminarium', duration: '58:15' },
      ],
      year: 2011,
    },
  ],
  2010: [
    {
      slug: 'sofisci-prawda-relatywizm-2010',
      title: 'Sofiści, prawda i relatywizm',
      date: '12 czerwca 2010',
      dateSortable: '2010-06-12',
      place: 'Roztocze',
      category: 'wyklad',
      tags: ['sofiści', 'prawda', 'relatywizm'],
      description: 'Sofistyczna teoria relatywizmu a Sokratejskie poszukiwanie obiektywnej prawdy — aktualność starożytnego sporu.',
      parts: [
        { id: 'dQw4w9WgXcQ', label: 'Wykład', duration: '46:00' },
      ],
      year: 2010,
    },
  ],
  2009: [
    {
      slug: 'ateny-jerozolima-2009',
      title: 'Ateny i Jerozolima — dwa źródła Europy',
      date: '4 kwietnia 2009',
      dateSortable: '2009-04-04',
      place: 'Roztocze',
      category: 'konferencja',
      tags: ['ateny', 'jerozolima', 'europa'],
      description: 'Dwa wielkie źródła cywilizacji europejskiej — filozofia grecka i objawienie biblijne.\nIch wzajemna relacja i synteza w tradycji chrześcijańskiej.',
      parts: [
        { id: 'dQw4w9WgXcQ', label: 'Wykład inauguracyjny', duration: '1:10:00' },
      ],
      year: 2009,
    },
  ],
  2008: [
    {
      slug: 'czlowiek-obraz-boga-2008',
      title: 'Człowiek jako imago Dei',
      date: '19 września 2008',
      dateSortable: '2008-09-19',
      place: 'Roztocze',
      category: 'wyklad',
      tags: ['antropologia', 'imago dei', 'godność'],
      description: 'Filozoficzna i teologiczna refleksja nad godnością człowieka jako obrazu Bożego w tradycji platońskiej i biblijnej.',
      parts: [
        { id: 'dQw4w9WgXcQ', label: 'Wykład', duration: '44:50' },
      ],
      year: 2008,
    },
  ],
  2007: [
    {
      slug: 'pierwszy-rok-refleksje-2007',
      title: 'Filozofia klasyczna — pierwsze spotkanie',
      date: '10 marca 2007',
      dateSortable: '2007-03-10',
      place: 'Roztocze',
      category: 'seminarium',
      tags: ['filozofia', 'klasyczna', 'początek'],
      description: 'Inauguracyjne seminarium filozoficzne projektu Ateny Roztocza. Wprowadzenie do filozofii klasycznej.',
      parts: [
        { id: 'dQw4w9WgXcQ', label: 'Seminarium', duration: '38:00' },
      ],
      year: 2007,
    },
  ],
  2006: [
    {
      slug: 'inauguracja-2006',
      title: 'Inauguracja projektu Ateny Roztocza',
      date: '15 września 2006',
      dateSortable: '2006-09-15',
      place: 'Roztocze',
      category: 'inne',
      tags: ['inauguracja', 'projekt', 'filozofia'],
      description: 'Pierwsze spotkanie projektu Ateny Roztocza — prezentacja idei i założeń.\nWizja projektu: ożywienie klasycznej tradycji filozoficznej w polskim kontekście.',
      parts: [
        { id: 'dQw4w9WgXcQ', label: 'Wykład inauguracyjny', duration: '32:45' },
      ],
      year: 2006,
    },
  ],
};

// Lata posortowane malejąco
export const years: number[] = Object.keys(multimediaData)
  .map(Number)
  .sort((a, b) => b - a);

export function getAllEntries(): MultimediaEntry[] {
  return years.flatMap((rok) => multimediaData[rok] ?? []);
}

export function getEntriesByYear(rok: number): MultimediaEntry[] {
  return multimediaData[rok] ?? [];
}

export function getEntry(rok: number, slug: string): MultimediaEntry | null {
  return (multimediaData[rok] ?? []).find((e) => e.slug === slug) ?? null;
}
