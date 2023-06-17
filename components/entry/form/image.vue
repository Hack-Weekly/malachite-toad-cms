<template>
    
    <div class="col-span-full mt-7">
        <label for="cover-photo" class="block text-xl font-medium leading-6 text-sky-900"> {{ field.field_name }} <i class="fa-regular fa-trash-can flash" @click="remove_field"></i> </label>
        <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
        <div class="text-center">
            <PhotoIcon class="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
            <div class="mt-4 flex text-sm leading-6 text-gray-600">
            <label for="file-upload" class="relative cursor-pointer rounded ">
                <span>Upload a file</span>
                <input id="file-upload" name="file-upload" type="file" class="sr-only"/>
            </label>
            <p class="pl-1">or drag and drop</p>
            </div>
            <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
        </div>
        </div>
    </div>

</template>

<script setup lang="ts">

    import { toast } from 'vue3-toastify';
    import 'vue3-toastify/dist/index.css';

    const props = defineProps(['field'])

    const route = useRoute()

    async function remove_field() {

        const response = await $fetch('/api/entry/remove_field', {
            onRequest({ request, options, error}) {
                options.method = 'POST'
                options.headers = { "Content-type": "application/json" };
                options.body = {
                    entry_slug: route.params.entry,
                    field_name: props.field.field_name
            }},
            onResponse({ response, options }) {
                toast.success('Field removed successfully')
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

        }

    }

</script>
