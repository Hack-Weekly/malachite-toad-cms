<template>

    <!-- the homepage is top section one is the login btn + title + feature btn and the bottom section hold feature img -->
    <div class="home_page h-full w-full relative bg-white -center-col">

        <div class="top_section w-full h-[50vh] gap-y-8  -center-col relative z-10 bg-sky-400">

            <!-- login btn logic for user state -->
            <template v-if="status !== 'authenticated'">
                <button  class="absolute top-5 right-5 w-32 h-10 border border-white text-white" @click="login()">Login</button>
            </template>
            <template v-else>
                <button class="absolute top-5 right-5 w-32 h-10 border border-white text-white" @click="logout()">Logout</button>
            </template>

            <h1 class="top_section_title text-6xl text-white max-sm:text-4xl text-center"> Malachite Toad <span class="text-sky-800"> CMS  </span></h1>

            <!-- <button class="top_section_feature_btn w-64 h-16 border-2 text-2xl text-white max-sm:w-32 max-sm:h-10 max-sm:text-base"> Learn More </button> -->

            <template v-if="status !== 'authenticated'">
                <button  class="top_section_feature_btn w-64 h-16 border-2 text-2xl text-white max-sm:w-32 max-sm:h-10 max-sm:text-base" @click="login()">Learn More</button>
            </template>
            <template v-else>
                <button class="top_section_feature_btn w-64 h-16 border-2 text-2xl text-white max-sm:w-32 max-sm:h-10 max-sm:text-base" @click="navigateTo('/spaces')">Learn More</button>
            </template>

        </div>

        <div class="bottom_section w-full h-full relative -center py-16 before:w-full before:h-2/4 before:bg-sky-400 before:absolute before:top-0">
            <img src="/program_overview.png" alt="program_overview" class="w-full px-20 z-10 max-sm:px-2">
        </div>

    </div>

</template>
<script lang="ts" setup>

const {
  status,
  data,
  lastRefreshedAt,
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
  signOut,
  
} = useAuth()

async function login() {
    await signIn('auth0', { callbackUrl: '/spaces' })
}

async function logout() {
    await signOut({ callbackUrl: '/' })
}

definePageMeta({
  layout: "empty",
});

</script>