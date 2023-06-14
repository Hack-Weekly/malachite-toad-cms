// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@sidebase/nuxt-auth'],
  auth: {
    baseURL: 'http://localhost:3000',
    
  },
  imports: {
    dirs: [
      // Scan top-level modules
      'composables',
      // ... or scan modules nested one level deep with a specific name and file extension
      'composables/*/index.{ts,js,mjs,mts}',
      // ... or scan all modules within given directory
      'composables/**'
    ]
  },
  app: {
    head: {
      title: 'Toadcms',
      htmlAttrs:{
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      ], 
      link: [],
      script: [
        {
          src: 'https://kit.fontawesome.com/f920441aaa.js',
          crossorigin: 'anonymous'
        }
      ]
    },
  },

  runtimeConfig: {
    mongodb_uri: process.env.MONGODB_URI,

    public: {
      apiBase: '/api', // can be overridden by NUXT_PUBLIC_API_BASE environment variable
    }
  },
})
