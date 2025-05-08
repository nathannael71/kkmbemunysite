export default {
  name: 'about',
  title: 'About Section',
  type: 'document',
  fields: [
    {
      name: 'sectionLabel',
      title: 'Section Label',
      type: 'string',
      description: 'The small label shown above the title',
      validation: Rule => Rule.required()
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required()
    },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: Rule => Rule.required()
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'FontAwesome icon class (e.g. fa-graduation-cap)',
              validation: Rule => Rule.required()
            }
          ]
        }
      ],
      validation: Rule => Rule.min(1).required()
    }
  ]
}
