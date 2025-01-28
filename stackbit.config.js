import { defineStackbitConfig } from '@stackbit/types';
import { ContentfulContentSource } from '@stackbit/cms-contentful';

export default defineStackbitConfig({
  ssgName: 'nuxt',
  contentSources: [
    new ContentfulContentSource({
      spaceId: process.env.CONTENTFUL_SPACE_ID,
      environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
      previewToken: process.env.CONTENTFUL_PREVIEW_TOKEN,
      accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
    }),
  ],
  modelExtensions: [
    // Extend the "Page" and "Post" models by defining them as page models
    { name: 'Page', type: 'page', urlPath: '/' },
  ],
});
