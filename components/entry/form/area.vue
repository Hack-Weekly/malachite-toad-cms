<template>
    
    <div class="col-span-full mt-7">
        <label for="about" class="block text-xl font-medium leading-6 text-sky-900"> {{ field.field_name }} <span @click="remove_field"> ※ </span> </label>
        <div class="mt-2">
        <textarea id="about" name="about" rows="3" class="block w-full rounded-md py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 border-2 outline-none px-3 border-gray-300" v-model="inputValue" @input="$emit('input_emit', inputValue)"/>
        </div>
    </div>

</template>

<script setup lang="ts">

    const props = defineProps(['field'])

    const route = useRoute()

    let inputValue = ref('')

    async function remove_field() {

        const response = await $fetch('/api/entry/remove_field', {
            method: 'post',
            body: {
                entry_slug: route.params.entry,
                field_name: props.field.field_name
            }
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
