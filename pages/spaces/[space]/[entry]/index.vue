<template>

    <EntryDialog />

    <!-- here is the mine nav to control the navigation backward and forward :? not that this only contain two btn -->
    <div class="mini_nav w-full h-20 border-b-4 border-gray-100 max-md:px-0 flex justify-between items-center px-4">
        
        <Nuxt-link :to="`/spaces/${route.params.space}`">
            <button class="backward-btn indepth_custome_shadow max-sm:w-8 max-sm:h-8 :min-h-[32px] bg-sky-800 flex justify-center items-center gap-x-4 rounded py-3 px-6 text-lg text-white hover:bg-transparent hover:border-sky-800 hover:border hover:text-sky-800 transition-all duration-500 hover:shadow-transparent group">
                <i class="fa-solid fa-angle-left max-md:hidden max-sm:block"></i> <span class="text-white/30 max-sm:hidden group-hover:text-sky-400"> | </span> <p class="max-sm:hidden"> Space </p>
            </button>
        </Nuxt-link>

        <button class="forward-btn indepth_custome_shadow max-sm:w-8 max-sm:h-8 :min-h-[32px] bg-sky-800 flex justify-center items-center gap-x-4 rounded py-3 px-6 text-lg text-white hover:bg-transparent hover:border-sky-800 hover:border hover:text-sky-800 transition-all duration-500 hover:shadow-transparent group" @click="openDialog">
            <i class="fa-solid fa-plus max-md:hidden max-sm:block"></i> <span class="text-white/30 group-hover:text-sky-400 max-sm:hidden"> | </span> <p class="max-sm:hidden"> Add Field </p>
        </button>

    </div>
    <!-- this is the end of the min navbar -->

    <!-- this div hold the the actuall and preview fields  -->
    <div class="fields_container w-full h-full -center p-8 px-8 gap-y-4 max-lg:p-8 max-lg:gap-y-0 max-lg:flex-wrap">

        <!-- here is the left side which hold the preview and control to edit or remove the field -->
        <div class="left-side h-full w-72 min-w-[288px] max-lg:h-auto">

            <EntryContentsPreviewContainer />

        </div>
        <!-- the left side ends here -->

        <!-- here is the right side which hold the actuall fields-->
        <div class="right-side w-full h-full px-16 max-lg:px-0">

            <EntryFormAllFields />

        </div>
        <!-- thie right side ends here -->

    </div>
    <!-- the fields_container ends here -->

</template>

<script setup lang="ts">

    const route = useRoute()

    function openDialog() {
        const dialog = document.getElementById('settingsDialog');
        const dialogElement = dialog as HTMLDialogElement;
        dialogElement.showModal();
    }

</script>


<style scoped>

    .indepth_custome_shadow {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
    }

    [type="date"] {
    background:#fff url(https://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/calendar_2.png)  97% 50% no-repeat ;
    }
    [type="date"]::-webkit-inner-spin-button {
    display: none;
    }
    [type="date"]::-webkit-calendar-picker-indicator {
    opacity: 0;
    }

    label {
    display: block;
    }

</style>