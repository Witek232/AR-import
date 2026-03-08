import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'materialAudiowizualny',
  title: 'Materiał audiowizualny',
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
    defineField({name: 'rok',     title: 'Rok',     type: 'number'}),
    defineField({name: 'data',    title: 'Data',    type: 'date'}),
    defineField({name: 'miejsce', title: 'Miejsce', type: 'string'}),
    defineField({
      name: 'kategoria',
      title: 'Kategoria',
      type: 'string',
      options: {
        list: [
          {title: 'Wykład',      value: 'wyklad'},
          {title: 'Seminarium',  value: 'seminarium'},
          {title: 'Konferencja', value: 'konferencja'},
          {title: 'Inne',        value: 'inne'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'tagi',
      title: 'Tagi',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'opis',
      title: 'Opis (PL)',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'czesci',
      title: 'Części (filmy YouTube)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'youtubeId',   title: 'YouTube ID',  type: 'string'}),
            defineField({name: 'label',        title: 'Etykieta',    type: 'string'}),
            defineField({name: 'czas',         title: 'Czas trwania (np. 45:30)', type: 'string'}),
            defineField({name: 'opisCzesci',   title: 'Opis części', type: 'text', rows: 2}),
          ],
          preview: {
            select: {title: 'label', subtitle: 'youtubeId'},
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
    {name: 'dataDesc', title: 'Data (najnowsze)', by: [{field: 'data', direction: 'desc'}]},
    {name: 'rokDesc',  title: 'Rok (najnowsze)',  by: [{field: 'rok',  direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'tytul', subtitle: 'rok'},
  },
})
