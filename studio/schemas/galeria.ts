import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'galeria',
  title: 'Galeria — album',
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
    defineField({name: 'rok', title: 'Rok', type: 'number', group: 'tresc'}),
    defineField({
      name: 'opis', title: 'Opis (PL)', type: 'array',
      group: 'tresc',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'okladka', title: 'Okładka albumu', type: 'image',
      group: 'tresc',
      options: {hotspot: true},
    }),
    defineField({
      name: 'zdjecia', title: 'Zdjęcia', type: 'array',
      group: 'tresc',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'plik',      title: 'Zdjęcie',      type: 'image', options: {hotspot: true}}),
            defineField({name: 'podpis',    title: 'Podpis (PL)',  type: 'string'}),
            defineField({name: 'podpisEN',  title: 'Podpis (EN)',  type: 'string'}),
            defineField({name: 'podpisDE',  title: 'Podpis (DE)',  type: 'string'}),
            defineField({name: 'podpisES',  title: 'Podpis (ES)',  type: 'string'}),
            defineField({name: 'podpisIT',  title: 'Podpis (IT)',  type: 'string'}),
            defineField({name: 'alt',       title: 'Alt text',     type: 'string'}),
          ],
          preview: {select: {title: 'podpis', media: 'plik'}},
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
    {name: 'rokDesc', title: 'Rok (najnowsze)', by: [{field: 'rok', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'tytul', subtitle: 'rok', media: 'okladka'},
  },
})
