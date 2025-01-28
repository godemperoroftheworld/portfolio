import { ContentfulContentSource } from '@stackbit/cms-contentful';
import { defineStackbitConfig } from '@stackbit/types';

export default defineStackbitConfig({
  stackbitVersion: '~0.6.0',
  nodeVersion: '18',
  ssgName: 'custom',
  experimental: {
    ssg: {
      name: 'Nuxt3',
      logPatterns: {
        up: 'Listening on:',
      },
      passthrough: ['/vite-hmr/**'],
    },
  },
  contentSources: [
    new ContentfulContentSource({
      spaceId: process.env.CONTENTFUL_SPACE_ID!,
      environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
      previewToken: process.env.CONTENTFUL_PREVIEW_TOKEN!,
      accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
    }),
  ],
  devCommand: 'npm run dev --- -p {PORT}',
  postInstallCommand: 'npm i --no-save @stackbit/types @stackbit/cms-contentful',
});
