import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'wydarzenie',
  title: 'Wydarzenie',
  type: 'document',
  groups: [
    {name: 'tresc',    title: 'Treść'},
    {name: 'tlumaczenia', title: 'Tłumaczenia'},
    {name: 'seo',      title: 'SEO'},
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
    defineField({name: 'data',    title: 'Data',    type: 'date',   group: 'tresc'}),
    defineField({name: 'miejsce', title: 'Miejsce', type: 'string', group: 'tresc'}),
    defineField({
      name: 'typ', title: 'Typ', type: 'string',
      group: 'tresc',
      options: {
        list: [
          {title: 'Wykład',      value: 'wyklad'},
          {title: 'Seminarium',  value: 'seminarium'},
          {title: 'Konferencja', value: 'konferencja'},
          {title: 'Sympozjum',   value: 'sympozjum'},
          {title: 'Warsztaty',   value: 'warsztaty'},
          {title: 'Spotkanie',   value: 'spotkanie'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'status', title: 'Status', type: 'string',
      group: 'tresc',
      options: {
        list: [
          {title: 'Nadchodzące', value: 'upcoming'},
          {title: 'Archiwum',    value: 'past'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'jezyki', title: 'Języki', type: 'array',
      group: 'tresc',
      of: [{type: 'string'}],
      options: {list: ['PL','EN','DE','ES','IT'], layout: 'tags'},
    }),
    defineField({
      name: 'opis', title: 'Opis (PL)', type: 'array',
      group: 'tresc',
      of: [{type: 'block'}],
    }),
    defineField({name: 'hasReport',   title: 'Dostępna relacja', type: 'boolean', group: 'tresc'}),
    defineField({name: 'linkRelacji', title: 'Link do relacji',  type: 'url',     group: 'tresc'}),
    defineField({
      name: 'zdjecie', title: 'Zdjęcie', type: 'image',
      group: 'tresc',
      options: {hotspot: true},
    }),

    // Tłumaczenia
    defineField({name: 'tytulEN', title: 'Tytuł (EN)', type: 'string',             group: 'tlumaczenia'}),
    defineField({name: 'opisEN',  title: 'Opis (EN)',  type: 'array', of: [{type: 'block'}], group: 'tlumaczenia'}),
    defineField({name: 'tytulDE', title: 'Tytuł (DE)', type: 'string',             group: 'tlumaczenia'}),
    defineField({name: 'opisDE',  title: 'Opis (DE)',  type: 'array', of: [{type: 'block'}], group: 'tlumaczenia'}),
    defineField({name: 'tytulES', title: 'Tytuł (ES)', type: 'string',             group: 'tlumaczenia'}),
    defineField({name: 'opisES',  title: 'Opis (ES)',  type: 'array', of: [{type: 'block'}], group: 'tlumaczenia'}),
    defineField({name: 'tytulIT', title: 'Tytuł (IT)', type: 'string',             group: 'tlumaczenia'}),
    defineField({name: 'opisIT',  title: 'Opis (IT)',  type: 'array', of: [{type: 'block'}], group: 'tlumaczenia'}),

    // SEO
    defineField({
      name: 'seo', title: 'SEO', type: 'object',
      group: 'seo',
      fields: [
        defineField({name: 'metaTytul', title: 'Meta tytuł (PL)', type: 'string'}),
        defineField({name: 'metaOpis',  title: 'Meta opis (PL)',  type: 'text', rows: 2}),
        defineField({name: 'metaTytulEN', title: 'Meta tytuł (EN)', type: 'string'}),
        defineField({name: 'metaOpisEN',  title: 'Meta opis (EN)',  type: 'text', rows: 2}),
      ],
    }),
  ],
  orderings: [
    {name: 'dataDesc', title: 'Data (najnowsze)', by: [{field: 'data', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'tytul', subtitle: 'data', media: 'zdjecie'},
  },
})
