import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'wydarzenie',
  title: 'Wydarzenie',
  type: 'document',
  fields: [
    defineField({name: 'tytul',    title: 'Tytuł (PL)',  type: 'string'}),
    defineField({name: 'tytulEN',  title: 'Tytuł (EN)',  type: 'string'}),
    defineField({name: 'tytulDE',  title: 'Tytuł (DE)',  type: 'string'}),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {source: 'tytul'},
    }),
    defineField({name: 'data',    title: 'Data',   type: 'date'}),
    defineField({name: 'miejsce', title: 'Miejsce', type: 'string'}),
    defineField({
      name: 'typ',
      title: 'Typ',
      type: 'string',
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
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Nadchodzące', value: 'upcoming'},
          {title: 'Archiwum',    value: 'past'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'jezyki',
      title: 'Języki',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: ['PL', 'EN', 'DE', 'IT', 'ES'],
        layout: 'tags',
      },
    }),
    defineField({
      name: 'opis',
      title: 'Opis (PL)',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'opisEN',
      title: 'Opis (EN)',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'hasReport',
      title: 'Dostępna relacja',
      type: 'boolean',
    }),
    defineField({
      name: 'linkRelacji',
      title: 'Link do relacji',
      type: 'url',
    }),
    defineField({
      name: 'zdjecie',
      title: 'Zdjęcie',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({name: 'metaTytul',  title: 'Meta tytuł',  type: 'string'}),
        defineField({name: 'metaOpis',   title: 'Meta opis',   type: 'text', rows: 2}),
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
