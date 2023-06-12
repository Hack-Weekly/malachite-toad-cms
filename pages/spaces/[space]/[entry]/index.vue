<template>

    <dialog id="settingsDialog" class="w-2/4 max-sm:w-full">

        <div class="dialog-header bg-sky-800 flex justify-between items-center">

            <h2 class="text-white text-2xl px-8 py-6"> Add Field </h2>
            
            <button type="button" @click="closeDialog()" class="text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

        </div>

        <hr class="divider mb-4" />

        <div class="w-full h-full flex flex-col justify-start items-center px-2">

            <div class="pre_built_fields_container w-full -center gap-2 py-2 max-lg:flex-wrap">
                
                <div class="pre_built_field w-2/4 max-lg:w-full py-2 border-gray-300 border-2 flex hover:bg-sky-800 hover:border-white/80 group transition-all duration-500 justify-start items-center pl-4 gap-x-4 bg-white rounded">
                    <div class="w-12 h-8 rounded bg-red-400 -center border-2 text-white border-red-300">
                        <i class="fa-solid fa-t"></i>
                    </div>
                    <div>
                        <h1 class="text-sky-800 font-bold group-hover:text-white"> Text </h1>
                        <p class="text-gray-400 text-sm group-hover:text-white transition-all duration-500"> small text like title </p>
                    </div>
                </div>

                <div class="pre_built_field w-2/4 py-2 max-lg:w-full border-gray-300 border-2 flex hover:bg-sky-800 hover:border-white/80 group transition-all duration-500 justify-start items-center pl-4 gap-x-4 bg-white rounded">
                    <div class="w-12 h-8 rounded bg-green-400 -center border-2 text-white border-green-300">
                        <i class="fa-solid fa-a"></i>
                    </div>
                    <div>
                        <h1 class="text-sky-800 font-bold group-hover:text-white"> Area </h1>
                        <p class="text-gray-400 text-sm group-hover:text-white transition-all duration-500"> long text like description </p>
                    </div>
                </div>

            </div>

            <div class="pre_built_fields_container w-full -center gap-2 py-2 max-lg:flex-wrap">
                
                <div class="pre_built_field w-2/4 py-2 max-lg:w-full border-gray-300 border-2 flex hover:bg-sky-800 hover:border-white/80 group transition-all duration-500 justify-start items-center pl-4 gap-x-4 bg-white rounded">
                    <div class="w-12 h-8 rounded bg-yellow-400 -center border-2 text-white border-yellow-300">
                        <i class="fa-solid fa-d"></i>
                    </div>
                    <div>
                        <h1 class="text-sky-800 font-bold group-hover:text-white"> Date </h1>
                        <p class="text-gray-400 text-sm group-hover:text-white transition-all duration-500"> A date picker </p>
                    </div>
                </div>

                <div class="pre_built_field w-2/4 py-2 max-lg:w-full border-gray-300 border-2 flex hover:bg-sky-800 hover:border-white/80 group transition-all duration-500 justify-start items-center pl-4 gap-x-4 bg-white rounded">
                    <div class="w-12 h-8 rounded bg-blue-400 -center border-2 text-white border-blue-300">
                        <i class="fa-solid fa-m"></i>
                    </div>
                    <div>
                        <h1 class="text-sky-800 font-bold group-hover:text-white"> Media </h1>
                        <p class="text-gray-400 text-sm group-hover:text-white transition-all duration-500"> long text like description </p>
                    </div>
                </div>

            </div>

            <div class="sm:col-span-3 mt-7 w-full">
                <label for="first-name" class="block text-xl font-medium leading-6 text-sky-900"> Field Name </label>
                <div class="mt-2">
                <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-2 border-gray-300 py-1.5 text-gray-900 px-3 placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6" />
                </div>
            </div>

            <div class="mt-9 w-full flex items-center justify-start gap-x-6 border-t py-4 border-gray-300">
                <button type="submit" class="rounded bg-sky-900 px-6 py-3 text-xl indepth_custome_shadow text-white hover:border-sky-800 hover:border hover:bg-transparent hover:shadow-none hover:text-sky-800 transition-all duration-500"> Add </button>
            </div>

        </div>

    </dialog>

    <!-- here is the mine nav to control the navigation backward and forward :? not that this only contain two btn -->
    <div class="mini_nav w-full h-20 border-b-4 border-gray-100 max-md:px-0 flex justify-between items-center px-4">
        
        <button class="backward-btn indepth_custome_shadow max-sm:w-8 max-sm:h-8 :min-h-[32px] bg-sky-800 flex justify-center items-center gap-x-4 rounded py-3 px-6 text-lg text-white hover:bg-transparent hover:border-sky-800 hover:border hover:text-sky-800 transition-all duration-500 hover:shadow-transparent group">
            <i class="fa-solid fa-angle-left max-md:hidden max-sm:block"></i> <span class="text-white/30 max-sm:hidden group-hover:text-sky-400"> | </span> <p class="max-sm:hidden"> Space </p>
        </button>

        <button class="forward-btn indepth_custome_shadow max-sm:w-8 max-sm:h-8 :min-h-[32px] bg-sky-800 flex justify-center items-center gap-x-4 rounded py-3 px-6 text-lg text-white hover:bg-transparent hover:border-sky-800 hover:border hover:text-sky-800 transition-all duration-500 hover:shadow-transparent group" @click="openDialog">
            <i class="fa-solid fa-plus max-md:hidden max-sm:block"></i> <span class="text-white/30 group-hover:text-sky-400 max-sm:hidden"> | </span> <p class="max-sm:hidden"> Add Field </p>
        </button>

    </div>
    <!-- this is the end of the min navbar -->

    <!-- this div hold the the actuall and preview fields  -->
    <div class="fields_container w-full h-full -center p-8 px-8 gap-y-4 max-lg:p-8 max-lg:gap-y-0 max-lg:flex-wrap">

        <!-- here is the left side which hold the preview and control to edit or remove the field -->
        <div class="left-side h-full w-72 min-w-[288px] max-lg:h-auto">
            
            <div class="elements-holder w-full py-4 flex justify-center items-start flex-col px-2 gap-y-4">

                <h1 class="left-side-title text-xl font-bold text-sky-900"> All Fields ※ </h1>

                <div class="element_preview bg-white w-full px-3 py-1.5 rounded flex justify-between border-2 border-gray-300 items-center text-base text-sky-900">
                    <p> text <span class="text-gray-300"> 〜 </span> food-name  </p>
                    <i class="fa-regular fa-trash-can flash"></i>
                </div>

                <div class="element_preview bg-white w-full px-3 py-1.5 rounded flex justify-between border-2 border-gray-300 items-center text-base text-sky-900">
                    <p> area <span class="text-gray-300"> 〜 </span> food-description  </p>
                    <i class="fa-regular fa-trash-can flash"></i>
                </div>

                <div class="element_preview bg-white w-full px-3 py-1.5 rounded flex justify-between border-2 border-gray-300 items-center text-base text-sky-900">
                    <p> Date <span class="text-gray-300"> 〜 </span> Recipe-Date  </p>
                    <i class="fa-regular fa-trash-can flash"></i>
                </div>

                <div class="element_preview bg-white w-full px-3 py-1.5 rounded flex justify-between border-2 border-gray-300 items-center text-base text-sky-900">
                    <p> image <span class="text-gray-300"> 〜 </span> food-image  </p>
                    <i class="fa-regular fa-trash-can flash"></i>
                </div>

            </div>

        </div>
        <!-- the left side ends here -->

        <!-- here is the righ side which hold the actuall fields-->
        <div class="right-side w-full h-full px-16 max-lg:px-0">

            <div class="w-full h-full flex-col px-2">

                <div class="sm:col-span-3 mt-7">
                    <label for="first-name" class="block text-xl font-medium leading-6 text-sky-900"> Food Name ※ </label>
                    <div class="mt-2">
                    <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-2 border-gray-300 py-1.5 text-gray-900 px-3 placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div class="col-span-full mt-7">
                    <label for="about" class="block text-xl font-medium leading-6 text-sky-900"> Food Description ※ </label>
                    <div class="mt-2">
                    <textarea id="about" name="about" rows="3" class="block w-full rounded-md py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 border-2 outline-none px-3 border-gray-300" />
                    </div>
                </div>

                <div class="mt-7">
                    <label for="dateofbirth" class="block text-xl font-medium leading-6 text-sky-900"> Recipe Date </label>
                    <input type="date" name="dateofbirth" id="dateofbirth" class="mt-3 block w-full rounded-md border-2 py-1.5 text-gray-900 border-gray-300 outline-none px-3 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                </div>

                <div class="col-span-full mt-7">
                    <label for="cover-photo" class="block text-xl font-medium leading-6 text-sky-900"> Cover photo ※ </label>
                    <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div class="text-center">
                        <PhotoIcon class="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                        <div class="mt-4 flex text-sm leading-6 text-gray-600">
                        <label for="file-upload" class="relative cursor-pointer rounded ">
                            <span>Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" class="sr-only" />
                        </label>
                        <p class="pl-1">or drag and drop</p>
                        </div>
                        <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                    </div>
                    </div>
                </div>

                <div class="mt-9 flex items-center justify-start gap-x-6 border-t py-4 border-gray-300">
                    <button type="submit" class="rounded bg-sky-900 px-6 py-3 text-xl indepth_custome_shadow text-white hover:border-sky-800 hover:border hover:bg-transparent hover:shadow-none hover:text-sky-800 transition-all duration-500">Save</button>
                    <button type="button" class="text-sm font-semibold leading-6 text-sky-800">Cancel</button>
                </div>

                <div class="mt-6 w-full h-10"></div>

            </div>

        </div>
        <!-- thie right side ends here -->

    </div>
    <!-- the fields_container ends here -->

</template>

<script lang="ts" setup>
    import { onMounted } from 'vue';

    function openDialog() {
        const dialog = document.getElementById('settingsDialog');
        const dialogElement = dialog as HTMLDialogElement;
        dialogElement.showModal();
    }

    function closeDialog() {
        const dialog = document.getElementById('settingsDialog');
        const dialogElement = dialog as HTMLDialogElement;
        dialogElement.close();
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

    /* custom styles */
    body {
    padding: 4em;
    background: #e5e5e5;
    font: 13px/1.4 Geneva, 'Lucida Sans', 'Lucida Grande', 'Lucida Sans Unicode', Verdana, sans-serif;
    }
    label {
    display: block;
    }
    [type="date"] {
    /* border: 1px solid #c4c4c4;
    border-radius: 5px;
    background-color: #fff;
    padding: 3px 5px;
    box-shadow: inset 0 3px 6px rgba(0,0,0,0.1);
    width: 190px; */
    }

</style>