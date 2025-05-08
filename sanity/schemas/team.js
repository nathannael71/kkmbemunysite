export default {
  name: 'team',
  title: 'Team Member',
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
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url'
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string'
    },
    {
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url'
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 999
    }
  ],
  preview: {
    select: {
      title: 'name',
      position: 'position',
      media: 'photo',
    },
    prepare(selection) {
      const {position} = selection
      return Object.assign({}, selection, {
        subtitle: position,
      })
    },
  },
}
