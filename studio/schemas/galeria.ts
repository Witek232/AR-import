import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'galeria',
  title: 'Galeria — album',
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
    defineField({name: 'rok', title: 'Rok', type: 'number'}),
    defineField({
      name: 'opis',
      title: 'Opis',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'okladka',
      title: 'Okładka albumu',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'zdjecia',
      title: 'Zdjęcia',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'plik',
              title: 'Zdjęcie',
              type: 'image',
              options: {hotspot: true},
            }),
            defineField({name: 'podpis', title: 'Podpis (PL)', type: 'string'}),
            defineField({name: 'podpisEN', title: 'Podpis (EN)', type: 'string'}),
            defineField({name: 'alt', title: 'Alt text', type: 'string'}),
          ],
          preview: {
            select: {title: 'podpis', media: 'plik'},
          },
        },
      ],
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
    {name: 'rokDesc', title: 'Rok (najnowsze)', by: [{field: 'rok', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'tytul', subtitle: 'rok', media: 'okladka'},
  },
})
