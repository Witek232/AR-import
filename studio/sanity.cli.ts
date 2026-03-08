import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'TWOJ_PROJECT_ID',
    dataset: 'production',
  },
})
