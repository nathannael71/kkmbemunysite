import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {structure} from './desk/deskStructure'

export default defineConfig({
  name: 'default',
  title: 'KKM BEM UNY',

  projectId: 'your-sanity-project-id',
  dataset: 'production',

  plugins: [
    deskTool({
      structure
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
