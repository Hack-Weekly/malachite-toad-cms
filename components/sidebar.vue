<template>
    
    <!-- the sidebar is here -->
    <div class="sidebar relative min-w-[288px] w-72 h-full flex justify-center items-start bg-gray-200 max-sm:w-16 max-sm:min-w-[64px]" id="sidebar">
        <ul class="flex flex-col justify-center items-start mt-20">
            <h1 class="text-lg max-sm:hidden"> Manage </h1>
            <li class="py-4">
                <div class="py-4 px-2 text-lg text-sky-800 tracking-normal">
                        <NuxtLink to="/spaces" class="flex justify-start gap-x-3 items-center">
                            <i class="fa-solid fa-house"></i>
                            <p class="max-sm:hidden"> Spaces </p>
                        </NuxtLink>
                </div>
                <div class="sub_ul">
                    <ul class="">
                        <li class="py-4 px-2 text-sky-800 hover:opacity-80 hover:transition-opacity hover:ease-in hover:duration-150">
                            <NuxtLink to="/all_apis" target="_blank" class="flex justify-start gap-x-3 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M10 12h-1v5h1" />
                                    <path d="M14 12h1v5h-1" />
                                    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                                    <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                                </svg>
                                <p class="max-sm:hidden"> API docs</p>
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>

        <!-- the user details and logout is here is here -->
        <div class="absolute bottom-0 w-full">
            <div class="pfp_details_holder relative flex gap-x-2 px-3 justify-between items-center w-full py-2 bg-gray-200/50">

                <div class="w-36 h-16 absolute right-0 translate-x-[164px] -translate-y-[20px] bg-white rounded shadow-md overflow-hidden max-sm:block hidden">
                    <div class="w-full h-8 text-sm flex justify-start items-center pl-4 hover:bg-gray-100 transition-all duration-500">
                        <NuxtLink to="/spaces">
                            My Account
                        </NuxtLink>
                    </div>
                    <div class="w-full h-8 text-sm flex justify-start items-center pl-4 hover:bg-gray-100 transition-all duration-500">
                        <p> Logout </p>
                    </div>
                </div>

                <div class="pfp_img -center">
                    <img :src="data?.user?.image" alt="pfp_img" class="w-10 h-10 rounded-full">
                </div>
                <div class="pfp_details text-xs max-sm:hidden">
                    <p> {{ data?.user?.name }} </p>
                    <p> {{ data?.user?.email }} </p>
                </div>
                <button @click="logout()" class="logout text-center text-xs max-sm:hidden">
                    logout
                </button>

            </div>
        </div>
    </div>
    <!-- the sidebar end here -->

</template>

<script setup lang="ts">

const {
  data,
  signOut
} = useAuth()

async function logout() {
  await signOut({callbackUrl: '/'})
}



</script>

<style>

</style>