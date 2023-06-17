<template>
    
    <div class="sm:col-span-3 mt-7">
        <label for="first-name" class="block text-xl font-medium leading-6 text-sky-900"> {{ field.field_name }} <i class="fa-regular fa-trash-can flash" @click="remove_field"></i> </label>
        <div class="mt-2">
        <input type="text" name="first-name" id="text-fields" autocomplete="given-name" class="text-fields block w-full rounded-md border-2 border-gray-300 py-1.5 text-gray-900 px-3 placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6"  v-model="inputValue" @input="$emit('input_emit', inputValue)"/>
        </div>
    </div>

</template>

<script setup lang="ts">

    import { toast } from 'vue3-toastify';
    import 'vue3-toastify/dist/index.css';

    const props = defineProps(['field'])

    const route = useRoute()

    let inputValue = ref('')

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
