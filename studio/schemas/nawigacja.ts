import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'nawigacja',
  title: 'Menu nawigacji',
  type: 'document',
  fields: [
    defineField({
      name: 'nazwa',
      title: 'Nazwa menu',
      type: 'string',
      description: 'np. "Główna", "Stopka"',
    }),
    defineField({
      name: 'slug',
      title: 'Identyfikator',
      type: 'slug',
      options: {source: 'nazwa'},
    }),
    defineField({
      name: 'pozycje',
      title: 'Pozycje menu',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'pozycja',
          fields: [
            defineField({name: 'etykieta', title: 'Etykieta (PL)', type: 'string'}),
            defineField({name: 'etykietaEN', title: 'Etykieta (EN)', type: 'string'}),
            defineField({name: 'etykietaDE', title: 'Etykieta (DE)', type: 'string'}),
            defineField({name: 'href', title: 'Link (URL)', type: 'string'}),
            defineField({
              name: 'podpozycje',
              title: 'Podmenu',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({name: 'etykieta', title: 'Etykieta (PL)', type: 'string'}),
                    defineField({name: 'href', title: 'Link (URL)', type: 'string'}),
                  ],
                },
              ],
            }),
          ],
          preview: {
            select: {title: 'etykieta', subtitle: 'href'},
          },
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'nazwa'},
  },
})
