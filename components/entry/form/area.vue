<template>
    
    <div class="col-span-full mt-7">
        <label for="about" class="block text-xl font-medium leading-6 text-sky-900"> {{ field.field_name }} <i class="fa-regular fa-trash-can flash" @click="remove_field"></i> </label>
        <div class="mt-2">
        <textarea id="area-fields" name="about" rows="3" class="area-fields block w-full rounded-md py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 border-2 outline-none px-3 border-gray-300" v-model="inputValue" @input="$emit('input_emit', inputValue)"/>
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
                toast.success('Field rewmoved successfully')
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
