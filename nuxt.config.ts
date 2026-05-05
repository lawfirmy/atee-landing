// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  nitro: {
    preset: 'github-pages',
  },
  app: {
    head: {
      title: 'atee - 30자만 적으면, 너만의 웹사이트 완성',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '30자만 적으면, site.atee.app 이라는 너만의 웹사이트가 완성됩니다. A4 1장 분량의 아이디어만 준비하세요.' },
        { property: 'og:title', content: 'atee - 30자만 적으면, 너만의 웹사이트 완성' },
        { property: 'og:description', content: 'A4 1장 분량의 아이디어만 준비하세요. 나머지는 저희가 합니다.' },
        { property: 'og:type', content: 'website' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap' },
      ],
    },
  },
})
