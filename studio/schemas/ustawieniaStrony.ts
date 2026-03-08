import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'ustawieniaStrony',
  title: 'Ustawienia strony',
  type: 'document',
  fields: [
    defineField({
      name: 'tytulStrony',
      title: 'Tytuł strony',
      type: 'string',
    }),
    defineField({
      name: 'opisStrony',
      title: 'Opis strony (SEO)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'slowanKluczowe',
      title: 'Słowa kluczowe',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'ogImage',
      title: 'Domyślne zdjęcie OG (social media)',
      type: 'image',
    }),
    defineField({
      name: 'emailKontaktowy',
      title: 'Email kontaktowy',
      type: 'string',
    }),
    defineField({
      name: 'telefon',
      title: 'Telefon',
      type: 'string',
    }),
    defineField({
      name: 'adres',
      title: 'Adres',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook URL',
      type: 'url',
    }),
    defineField({
      name: 'youtube',
      title: 'YouTube URL',
      type: 'url',
    }),
  ],
})
