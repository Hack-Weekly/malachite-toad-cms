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

            <div class="pre_built_fields_container w-full -center gap-2 py-2 flex-wrap">
                
                <EntryPreBuiltField v-for="d in data" :key="d" :data='d'/>

            </div>

            <div class="sm:col-span-3 mt-7 w-full">
                <label for="first-name" class="block text-xl font-medium leading-6 text-sky-900"> Field Name </label>
                <div class="mt-2">
                <input type="text" name="first-name" v-model="field_name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-2 border-gray-300 py-1.5 text-gray-900 px-3 placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6" />
                </div>
            </div>

            <div class="mt-9 w-full flex items-center justify-start gap-x-6 border-t py-4 border-gray-300">
                <button type="submit" @click="onSubmit" class="rounded bg-sky-900 px-6 py-3 text-xl indepth_custome_shadow text-white hover:border-sky-800 hover:border hover:bg-transparent hover:shadow-none hover:text-sky-800 transition-all duration-500"> Add </button>
            </div>

        </div>

    </dialog>

</template>

<script setup lang="ts">

    import { toast } from 'vue3-toastify';
    import 'vue3-toastify/dist/index.css';

    const route = useRoute()

    const field_type = useState('field_type', () => '')

    const field_name = ref('')

    const data = ref([
        {
            color: 'rgb(248 113 113)',
            title: 'text',
            description: 'small text like title'
        }, {
            color: 'rgb(74 222 128)',
            title: 'area',
            description: 'long text like description'        
        }, {
            color: 'rgb(250 204 21)',
            title: 'date',
            description: 'A date picker'
        }, {
            color: 'rgb(96 165 250)',
            title: 'media',
            description: 'media like, image, video'
        }
    ])

    function closeDialog() {
        const dialog = document.getElementById('settingsDialog');
        const dialogElement = dialog as HTMLDialogElement;
        dialogElement.close();
    }

    async function onSubmit() {

        const response = await $fetch('/api/entry/create_field', {
            onRequest({ request, options, error}) {
                options.method = 'POST'
                options.headers = { "Content-type": "application/json" };
                options.body = {
                    entry_slug: route.params.entry,
                    field_type: field_type.value,
                    field_name: field_name.value
            }},
            onResponse({ response, options }) {
                toast.success('Field created successfully')
            },
            onRequestError({request, options, error}) {
                toast.error('Something went wrong. Please try again later')
            },
            onResponseError(context) {
                toast.error('Something went wrong. Please try again later')
            },
        })

        if(response) {
            
            let all_fields = useState('fields')

            let fields: any = await $fetch('/api/entry/get_all_fields', {
                method: 'post',
                body: {
                    entry_slug: route.params.entry,
                }
            })

            all_fields.value = fields?.res

            closeDialog()

        }
        
    }

</script>
