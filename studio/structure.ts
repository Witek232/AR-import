import {StructureBuilder} from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Ateny Roztocza')
    .items([
      S.listItem()
        .title('Ustawienia strony')
        .child(
          S.document()
            .schemaType('ustawieniaStrony')
            .documentId('ustawieniaStrony')
        ),
      S.divider(),
      S.documentTypeListItem('nawigacja').title('Menu nawigacji'),
      S.divider(),
      S.documentTypeListItem('wydarzenie').title('Wydarzenia'),
      S.documentTypeListItem('galeria').title('Galeria — albumy'),
      S.documentTypeListItem('materialAudiowizualny').title('Multimedia'),
      S.documentTypeListItem('artykul').title('Artykuły prasowe'),
      S.divider(),
      S.documentTypeListItem('kategoria').title('Kategorie'),
    ])
