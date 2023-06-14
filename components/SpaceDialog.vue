<template>
    <dialog id="settingsDialog" class="max-w-screen-xl">
        <div class="bg-sky-800 flex justify-between items-center">
            <h2 class="text-white text-2xl px-8 py-6">Settings</h2>
            <button type="button" @click="closeDialog('settingsDialog')" class="text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <div class="relative max-w-md lg:max-w-lg lg:ml-16 mt-12 px-3">
            <label class="text-sky-800 text-sm font-semibold">API key</label>
            <input type="password" v-model="apiKey" id="api-key" readonly class="bg-gray-200 rounded-lg outline-none ring-0 focus:ring-0 px-4 py-2.5 w-full block transition ease-linear delay-50 mt-1" />
            <template v-if="visibleApiKey">
                <svg @click="hideApiKey(false)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-gray-900 w-6 h-6 absolute top-10 right-4">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                </svg>
            </template>
            <template v-else>
                <svg @click="revealApiKey(true)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-gray-900 w-6 h-6 absolute top-10 right-4">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </template>
        </div>
        <div class="relative max-w-md lg:max-w-lg lg:ml-16 mt-12 px-3 flex flex-col">
            <span class="text-sky-800 text-sm font-semibold">DANGER ZONE</span>
            <form method="POST" @submit.prevent="onSubmit(props.space._id)">
                <button type="submit" class="bg-red-500 text-sm font-semibold w-32 text-white py-2 px-3 rounded mt-3">Delete space</button>
            </form>
        </div>
    </dialog>
</template>
<script setup lang="ts">
    import { toast } from 'vue3-toastify';
    import 'vue3-toastify/dist/index.css';

    const { data } = useAuth();

    const props = defineProps(['space'])
    const emit = defineEmits(['deleted-space']);


    let apiKey = ref(props.space.api_key);

    let visibleApiKey = ref(false);

    function revealApiKey(state: boolean) {
        const input = document.getElementById('api-key');
        const inputElement = input as HTMLInputElement;
        visibleApiKey.value = state;
        inputElement.type = 'text';
    }

    function hideApiKey(state: boolean) {
        const input = document.getElementById('api-key');
        const inputElement = input as HTMLInputElement;
        visibleApiKey.value = state;
        inputElement.type = 'password';
    }

    function closeDialog(id: string) {
        const dialog = document.getElementById(id);
        const dialogElement = dialog as HTMLDialogElement;
        dialogElement.close();
    }


    const onSubmit = async(space_id: any) => {
        console.log(props.space._id)

        const { data: response } = await useFetch('/api/space/delete', {
            onRequest({ request, options, error}) {
                options.method = 'POST'
                options.headers = { "Content-type": "application/json" };
                options.body = JSON.stringify({ 
                    space_id: space_id
                })
            },
            onResponse({ response, options }) {
                toast.success('Space deleted successfully')
                closeDialog('settingsDialog')
                emit('deleted-space')

            },
            onRequestError({request, options, error}) {
                toast.error('Something went wrong. Please try again later')
            },
            onResponseError(context) {
                toast.error('Something went wrong. Please try again later')
            },
        })

        console.log(response.value)
    }
</script>