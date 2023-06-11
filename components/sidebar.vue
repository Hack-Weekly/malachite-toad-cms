<template>
    
    <!-- the sidebar is here -->
    <div class="sidebar relative min-w-[288px] w-72 h-full flex justify-center items-start bg-gray-200 max-sm:w-16 max-sm:min-w-[64px]" id="sidebar">
        <ul class="flex flex-col justify-center items-start mt-20">
            <h1 class="text-lg max-sm:hidden"> Manage </h1>
            <li class="py-4">
                <div class="py-4 px-2 text-lg text-sky-800 tracking-normal flash">
                        <NuxtLink to="/spaces" class="flex justify-start gap-x-3 items-center">
                            <i class="fa-solid fa-house"></i>
                            <p class="max-sm:hidden"> Spaces </p>
                        </NuxtLink>
                </div>
                <div class="sub_ul">
                    <ul class="">
                        <li class="py-4 px-2 text-sky-800 flash">
                            <NuxtLink to="/contents" class="flex justify-start gap-x-3 items-center">
                                <i class="fa-solid fa-file-circle-plus"></i>
                                <p class="max-sm:hidden"> Contents </p>
                            </NuxtLink>
                        </li>
                        <li class="py-4 px-2 text-sky-800 flash">
                            <NuxtLink to="/all_apis" class="flex justify-start gap-x-3 items-center">
                                <i class="fa-solid fa-pen-nib"></i>
                                <p class="max-sm:hidden"> API </p>
                            </NuxtLink>
                        </li>
                        <li class="py-4 px-2 text-sky-800 flash">
                            <NuxtLink to="/files" class="flex justify-start gap-x-3 items-center">
                                <i class="fa-solid fa-image"></i>
                                <p class="max-sm:hidden"> Files </p>
                            </NuxtLink>
                        </li>
                        <li class="py-4 px-2 text-sky-800 flash">
                            <NuxtLink to="/user-roles" class="flex justify-start gap-x-3 items-center">
                                <i class="fa-solid fa-user-group"></i>
                                <p class="max-sm:hidden"> User Roles </p>
                            </NuxtLink>
                        </li>
                        <li class="py-4 px-2 text-sky-800 flash">
                            <NuxtLink to="/general-settings" class="flex justify-start gap-x-3 items-center">
                                <i class="fa-solid fa-gear"></i>
                                <p class="max-sm:hidden"> General Settings </p>
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
                        <NuxtLink to="/my-acoount">
                            My Acoount
                        </NuxtLink>
                    </div>
                    <div class="w-full h-8 text-sm flex justify-start items-center pl-4 hover:bg-gray-100 transition-all duration-500">
                        <p> Logout </p>
                    </div>
                </div>

                <div class="pfp_img -center">
                    <img :src="data.user.image" alt="pfp_img" class="w-10 h-10 rounded-full">
                </div>
                <div class="pfp_details text-xs max-sm:hidden">
                    <p> {{ data.user.name }} </p>
                    <p> {{ data.user.email }} </p>
                </div>
                <button class="logout text-center text-xs max-sm:hidden">
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
} = useAuth()

console.log(data.value)

</script>

<style>

.router-link-active {
    font-weight: 700;
}

.flash:hover {
    animation: flash 0.5s linear forwards 0s;
}

@keyframes flash {
    0% {
      opacity: 0;
    }
    25% {
      opacity: 1;
    }
    50% {
      opacity: 0.2;
    }
    75% {
      opacity: 1;
    }
    100% {
      opacity: 1;
    }
  }

</style>