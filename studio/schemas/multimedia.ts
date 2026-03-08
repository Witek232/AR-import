import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'materialAudiowizualny',
  title: 'Materiał audiowizualny',
  type: 'document',
  groups: [
    {name: 'tresc',       title: 'Treść'},
    {name: 'filmy',       title: 'Filmy YouTube'},
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
    defineField({name: 'rok',     title: 'Rok',     type: 'number', group: 'tresc'}),
    defineField({name: 'data',    title: 'Data',    type: 'date',   group: 'tresc'}),
    defineField({name: 'miejsce', title: 'Miejsce', type: 'string', group: 'tresc'}),
    defineField({
      name: 'kategoria', title: 'Kategoria', type: 'string',
      group: 'tresc',
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
      name: 'tagi', title: 'Tagi', type: 'array',
      group: 'tresc',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'opis', title: 'Opis (PL)', type: 'array',
      group: 'tresc',
      of: [{type: 'block'}],
    }),

    // Filmy
    defineField({
      name: 'czesci', title: 'Części (filmy YouTube)', type: 'array',
      group: 'filmy',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'youtubeId',  title: 'YouTube ID',           type: 'string'}),
            defineField({name: 'label',      title: 'Etykieta',             type: 'string'}),
            defineField({name: 'czas',       title: 'Czas (np. 45:30)',     type: 'string'}),
            defineField({name: 'opisCzesci', title: 'Opis części',          type: 'text', rows: 2}),
          ],
          preview: {select: {title: 'label', subtitle: 'youtubeId'}},
        },
      ],
    }),

    // Tłumaczenia
    defineField({name: 'tytulEN', title: 'Tytuł (EN)', type: 'string', group: 'tlumaczenia'}),
    defineField({name: 'opisEN',  title: 'Opis (EN)',  type: 'array', of: [{type: 'block'}], group: 'tlumaczenia'}),
    defineField({name: 'tytulDE', title: 'Tytuł (DE)', type: 'string', group: 'tlumaczenia'}),
    defineField({name: 'opisDE',  title: 'Opis (DE)',  type: 'array', of: [{type: 'block'}], group: 'tlumaczenia'}),
    defineField({name: 'tytulES', title: 'Tytuł (ES)', type: 'string', group: 'tlumaczenia'}),
    defineField({name: 'opisES',  title: 'Opis (ES)',  type: 'array', of: [{type: 'block'}], group: 'tlumaczenia'}),
    defineField({name: 'tytulIT', title: 'Tytuł (IT)', type: 'string', group: 'tlumaczenia'}),
    defineField({name: 'opisIT',  title: 'Opis (IT)',  type: 'array', of: [{type: 'block'}], group: 'tlumaczenia'}),

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
    select: {title: 'tytul', subtitle: 'rok'},
  },
})
