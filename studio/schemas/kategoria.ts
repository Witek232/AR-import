import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'kategoria',
  title: 'Kategoria',
  type: 'document',
  fields: [
    defineField({name: 'nazwa',   title: 'Nazwa (PL)', type: 'string'}),
    defineField({name: 'nazwaEN', title: 'Nazwa (EN)', type: 'string'}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'nazwa'},
    }),
    defineField({name: 'opis', title: 'Opis', type: 'text', rows: 2}),
  ],
  preview: {
    select: {title: 'nazwa'},
  },
})
