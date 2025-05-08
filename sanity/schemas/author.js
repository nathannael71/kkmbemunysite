export default {
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'position',
      title: 'Position',
      type: 'string'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 3
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string'
    },
    {
      name: 'instagram',
      title: 'Instagram Handle',
      type: 'string'
    },
    {
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url'
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      subtitle: 'position'
    }
  }
}
