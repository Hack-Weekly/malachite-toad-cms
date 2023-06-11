<template>
    <section>
        <div class="container mx-auto px-16 py-12 text-sky-800">
            <div class="grid grid-cols-5 gap-4">
                <div class="col-span-1 font-semibold">Page title</div>
                <div class="col-span-1 font-semibold">Slug</div>
                <div class="col-span-1 font-semibold">Last updated</div>
                <div class="col-span-1 font-semibold">Status</div>
                <div class="col-span-1 flex justify-end">
                    <button class="lg:text-md -mt-6 flex items-center justify-center rounded bg-sky-800 px-3 py-2 text-sm font-normal text-white hover:bg-sky-900 lg:px-6 lg:py-3">Create entry</button>
                </div>
            </div>
            <dialog id="settingsDialog" class="max-w-screen-xl">
                <div class="bg-sky-800 flex justify-between items-center">
                    <h2 class="text-white text-2xl px-8 py-6">Settings</h2>
                    <button type="button" @click="closeDialog()" class="text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <hr class="mb-4" />
                <div class="relative max-w-md lg:max-w-lg lg:ml-16 mt-12 px-3">
                    <label class="text-sky-800 text-sm font-semibold">API key</label>
                    <input
                        type="password"
                        readonly
                        class="bg-gray-200 rounded-lg outline-none ring-0 focus:ring-0 px-4 py-2.5 w-full block transition ease-linear delay-50 mt-1"
                    />
                    
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-gray-900 w-6 h-6 absolute top-10 right-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>

                </div>
                <div class="relative max-w-md lg:max-w-lg lg:ml-16 mt-12 px-3 flex flex-col">
                    <span class="text-sky-800 text-sm font-semibold">DANGER ZONE</span>
                    <button class="bg-red-500 text-sm font-semibold w-32 text-white py-2 px-3 rounded mt-3">Delete entry</button>
                </div>
            </dialog>
            <div class="overflow-x-scroll lg:overflow-hidden">
                <div class="mt-12 grid grid-cols-[repeat(5,minmax(max-content,1fr))] gap-4" v-for="n in 5" :key="n">
                    <div class="col-span-1">Home page</div>
                    <div class="col-span-1">home-page</div>
                    <div class="col-span-1">06-10-2023</div>
                    <div class="col-span-1">
                        <span class="rounded-full bg-green-300 px-5 py-1 text-white">Published</span>
                    </div>
                    <div class="col-span-1 flex justify-end">
                        <svg @click="openDialog()" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                            />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </section>
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
    dialog {
        padding-left: 0rem !important;
        padding-top: 0rem !important;
        padding-right: 0rem !important;
        width: 50% !important;
        height: 50% !important;
    }
</style>
