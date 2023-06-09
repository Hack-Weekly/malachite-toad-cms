<template>
    <div class="ml-10 mt-5">Hello World!</div>
    <template v-if="status !== 'authenticated'">
        <button  class="bg-green-500 py-2 px-3 ml-10 text-white" @click="login()">Login</button>
    </template>
    <template v-else>
        <button class="bg-blue-500 py-2 px-3 ml-10 text-white" @click="logout()">Logout</button>
    </template>
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
    await signIn('auth0', { callbackUrl: '/' })
}

async function logout() {
    await signOut({ callbackUrl: '/' })
}

console.log(status)



</script>