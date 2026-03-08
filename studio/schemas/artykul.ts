import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'artykul',
  title: 'Artykuł prasowy',
  type: 'document',
  groups: [
    {name: 'tresc',       title: 'Treść'},
    {name: 'tlumaczenia', title: 'Tłumaczenia'},
    {name: 'seo',         title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'tytul', title: 'Tytuł', type: 'string',
      group: 'tresc',
      validation: R => R.required(),
    }),
    defineField({
      name: 'slug', title: 'Slug (URL)', type: 'slug',
      options: {source: 'tytul'},
      group: 'tresc',
      validation: R => R.required(),
    }),
    defineField({name: 'data', title: 'Data publikacji', type: 'date', group: 'tresc'}),
    defineField({
      name: 'zrodlo', title: 'Źródło', type: 'string',
      group: 'tresc',
      options: {
        list: [
          {title: 'Nasz Dziennik', value: 'nasz-dziennik'},
          {title: 'Niedziela',     value: 'niedziela'},
          {title: 'Radio Maryja',  value: 'radio-maryja'},
          {title: 'Inne',          value: 'inne'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'kategoria', title: 'Kategoria', type: 'reference',
      group: 'tresc',
      to: [{type: 'kategoria'}],
    }),
    defineField({name: 'streszczenie', title: 'Streszczenie (PL)', type: 'text', rows: 3, group: 'tresc'}),
    defineField({
      name: 'tresc', title: 'Treść (PL)', type: 'array',
      group: 'tresc',
      of: [{type: 'block'}],
    }),
    defineField({name: 'linkZewnetrzny', title: 'Link do oryginału', type: 'url',    group: 'tresc'}),
    defineField({name: 'czasCzytania',   title: 'Czas czytania (min)', type: 'number', group: 'tresc'}),
    defineField({
      name: 'zdjecie', title: 'Zdjęcie', type: 'image',
      group: 'tresc',
      options: {hotspot: true},
    }),

    // Tłumaczenia
    defineField({name: 'tytulEN',        title: 'Tytuł (EN)',        type: 'string', group: 'tlumaczenia'}),
    defineField({name: 'streszecenieEN', title: 'Streszczenie (EN)', type: 'text', rows: 3, group: 'tlumaczenia'}),
    defineField({name: 'trescEN',        title: 'Treść (EN)',        type: 'array', of: [{type: 'block'}], group: 'tlumaczenia'}),
    defineField({name: 'tytulDE',        title: 'Tytuł (DE)',        type: 'string', group: 'tlumaczenia'}),
    defineField({name: 'streszecenieDE', title: 'Streszczenie (DE)', type: 'text', rows: 3, group: 'tlumaczenia'}),
    defineField({name: 'trescDE',        title: 'Treść (DE)',        type: 'array', of: [{type: 'block'}], group: 'tlumaczenia'}),
    defineField({name: 'tytulES',        title: 'Tytuł (ES)',        type: 'string', group: 'tlumaczenia'}),
    defineField({name: 'streszecenieES', title: 'Streszczenie (ES)', type: 'text', rows: 3, group: 'tlumaczenia'}),
    defineField({name: 'trescES',        title: 'Treść (ES)',        type: 'array', of: [{type: 'block'}], group: 'tlumaczenia'}),
    defineField({name: 'tytulIT',        title: 'Tytuł (IT)',        type: 'string', group: 'tlumaczenia'}),
    defineField({name: 'streszecenieIT', title: 'Streszczenie (IT)', type: 'text', rows: 3, group: 'tlumaczenia'}),
    defineField({name: 'trescIT',        title: 'Treść (IT)',        type: 'array', of: [{type: 'block'}], group: 'tlumaczenia'}),

    // SEO
    defineField({
      name: 'seo', title: 'SEO', type: 'object',
      group: 'seo',
      fields: [
        defineField({name: 'metaTytul',   title: 'Meta tytuł (PL)', type: 'string'}),
        defineField({name: 'metaOpis',    title: 'Meta opis (PL)',  type: 'text', rows: 2}),
        defineField({name: 'metaTytulEN', title: 'Meta tytuł (EN)', type: 'string'}),
        defineField({name: 'metaOpisEN',  title: 'Meta opis (EN)',  type: 'text', rows: 2}),
      ],
    }),
  ],
  orderings: [
    {name: 'dataDesc', title: 'Data (najnowsze)', by: [{field: 'data', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'tytul', subtitle: 'zrodlo', media: 'zdjecie'},
  },
})
