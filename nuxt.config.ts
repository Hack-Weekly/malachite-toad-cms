// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@sidebase/nuxt-auth'],
  auth: {
    baseURL: 'http://localhost:3000',
    
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
      link: []
    },
  },

  runtimeConfig: {
    public: {
      apiBase: '/api', // can be overridden by NUXT_PUBLIC_API_BASE environment variable
    }
  },
})
