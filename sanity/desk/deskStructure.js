export default (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.listItem()
        .title('Hero Section')
        .child(
          S.document()
            .schemaType('hero')
            .documentId('hero')
        ),
      S.listItem()
        .title('About Section')
        .child(
          S.document()
            .schemaType('about')
            .documentId('about')
        ),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !['siteSettings', 'hero', 'about'].includes(
            listItem.getId()
          )
      ),
    ])
