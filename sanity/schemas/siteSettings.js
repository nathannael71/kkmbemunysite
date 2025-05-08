export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'header',
      title: 'Header',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string',
        },
        {
          name: 'menuItems',
          title: 'Menu Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                },
                {
                  name: 'url',
                  title: 'URL',
                  type: 'string',
                },
                {
                  name: 'icon',
                  title: 'Icon',
                  type: 'string',
                  description: 'FontAwesome icon class (e.g. fa-home)',
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'footer',
      title: 'Footer',
      type: 'object',
      fields: [
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
        },
        {
          name: 'copyright',
          title: 'Copyright Text',
          type: 'string',
        },
        {
          name: 'socialMedia',
          title: 'Social Media',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'platform',
                  title: 'Platform',
                  type: 'string',
                },
                {
                  name: 'url',
                  title: 'URL',
                  type: 'url',
                },
                {
                  name: 'icon',
                  title: 'Icon',
                  type: 'string',
                  description: 'FontAwesome icon class (e.g. fa-instagram)',
                }
              ]
            }
          ]
        },
        {
          name: 'quickLinks',
          title: 'Quick Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                },
                {
                  name: 'url',
                  title: 'URL',
                  type: 'string',
                }
              ]
            }
          ]
        },
        {
          name: 'contactInfo',
          title: 'Contact Info',
          type: 'object',
          fields: [
            {
              name: 'address',
              title: 'Address',
              type: 'text',
              rows: 2,
            },
            {
              name: 'email',
              title: 'Email',
              type: 'string',
            },
            {
              name: 'instagram',
              title: 'Instagram Handle',
              type: 'string',
            }
          ]
        },
        {
          name: 'legalLinks',
          title: 'Legal Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                },
                {
                  name: 'url',
                  title: 'URL',
                  type: 'string',
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'teamSettings',
      title: 'Team Section Settings',
      type: 'object',
      fields: [
        {
          name: 'sectionLabel',
          title: 'Section Label',
          type: 'string',
        },
        {
          name: 'title',
          title: 'Title',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
        }
      ]
    },
    {
      name: 'articlesSettings',
      title: 'Articles Section Settings',
      type: 'object',
      fields: [
        {
          name: 'sectionLabel',
          title: 'Section Label',
          type: 'string',
        },
        {
          name: 'title',
          title: 'Title',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
        },
        {
          name: 'viewAllButtonText',
          title: 'View All Button Text',
          type: 'string',
        },
        {
          name: 'viewAllButtonUrl',
          title: 'View All Button URL',
          type: 'string',
        }
      ]
    },
    {
      name: 'timelineSettings',
      title: 'Timeline Section Settings',
      type: 'object',
      fields: [
        {
          name: 'sectionLabel',
          title: 'Section Label',
          type: 'string',
        },
        {
          name: 'title',
          title: 'Title',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
        }
      ]
    },
    {
      name: 'gallerySettings',
      title: 'Gallery Section Settings',
      type: 'object',
      fields: [
        {
          name: 'sectionLabel',
          title: 'Section Label',
          type: 'string',
        },
        {
          name: 'title',
          title: 'Title',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
        },
        {
          name: 'viewAllButtonText',
          title: 'View All Button Text',
          type: 'string',
        },
        {
          name: 'viewAllButtonUrl',
          title: 'View All Button URL',
          type: 'string',
        }
      ]
    },
    {
      name: 'contactSettings',
      title: 'Contact Section Settings',
      type: 'object',
      fields: [
        {
          name: 'sectionLabel',
          title: 'Section Label',
          type: 'string',
        },
        {
          name: 'title',
          title: 'Title',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
        },
        {
          name: 'contactInfo',
          title: 'Contact Info',
          type: 'object',
          fields: [
            {
              name: 'instagram',
              title: 'Instagram Text',
              type: 'string',
            },
            {
              name: 'instagramUrl',
              title: 'Instagram URL',
              type: 'url',
            },
            {
              name: 'email',
              title: 'Email',
              type: 'string',
            },
            {
              name: 'address',
              title: 'Address',
              type: 'text',
              rows: 2,
            }
          ]
        },
        {
          name: 'formspreeId',
          title: 'Formspree ID',
          type: 'string',
          description: 'The ID for your Formspree form',
        }
      ]
    },
    {
      name: 'locationSettings',
      title: 'Location Section Settings',
      type: 'object',
      fields: [
        {
          name: 'sectionLabel',
          title: 'Section Label',
          type: 'string',
        },
        {
          name: 'title',
          title: 'Title',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
        },
        {
          name: 'mapUrl',
          title: 'Google Maps Embed URL',
          type: 'url',
        },
        {
          name: 'locationName',
          title: 'Location Name',
          type: 'string',
        },
        {
          name: 'fullAddress',
          title: 'Full Address',
          type: 'text',
          rows: 2,
        },
        {
          name: 'directionsUrl',
          title: 'Directions URL',
          type: 'url',
        },
        {
          name: 'cta',
          title: 'Call to Action',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            },
            {
              name: 'buttonText',
              title: 'Button Text',
              type: 'string',
            },
            {
              name: 'buttonUrl',
              title: 'Button URL',
              type: 'string',
            }
          ]
        }
      ]
    }
  ]
}
