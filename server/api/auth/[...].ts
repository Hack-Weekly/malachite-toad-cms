// file: ~/server/api/auth/[...].ts
import { NuxtAuthHandler } from '#auth'
import Auth0Provider from "next-auth/providers/auth0";

export default NuxtAuthHandler({
  // A secret string you define, to ensure correct encryption
  secret: process.env.NUXT_SECRET,
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    Auth0Provider.default({
        clientId: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        issuer: process.env.AUTH0_ISSUER
    })
  ]
})