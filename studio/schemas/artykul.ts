import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'artykul',
  title: 'Artykuł prasowy',
  type: 'document',
  fields: [
    defineField({name: 'tytul',   title: 'Tytuł (PL)', type: 'string'}),
    defineField({name: 'tytulEN', title: 'Tytuł (EN)', type: 'string'}),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {source: 'tytul'},
    }),
    defineField({name: 'data', title: 'Data publikacji', type: 'date'}),
    defineField({
      name: 'zrodlo',
      title: 'Źródło',
      type: 'string',
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
      name: 'kategoria',
      title: 'Kategoria',
      type: 'reference',
      to: [{type: 'kategoria'}],
    }),
    defineField({
      name: 'streszczenie',
      title: 'Streszczenie (PL)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'tresc',
      title: 'Treść (PL)',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'linkZewnetrzny',
      title: 'Link do oryginalnego artykułu',
      type: 'url',
    }),
    defineField({
      name: 'czasCzytania',
      title: 'Czas czytania (minuty)',
      type: 'number',
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
        defineField({name: 'metaTytul', title: 'Meta tytuł', type: 'string'}),
        defineField({name: 'metaOpis',  title: 'Meta opis',  type: 'text', rows: 2}),
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
