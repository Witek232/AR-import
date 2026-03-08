import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {structure} from './structure'

export default defineConfig({
  name: 'ateny-roztocza',
  title: 'Ateny Roztocza — CMS',
  projectId: 'TWOJ_PROJECT_ID',
  dataset: 'production',
  plugins: [
    structureTool({structure}),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
