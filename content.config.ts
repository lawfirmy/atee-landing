import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    insights: defineCollection({
      type: 'page',
      source: 'insights/**',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        author: z.string().default('atee'),
      }),
    }),
  },
})
