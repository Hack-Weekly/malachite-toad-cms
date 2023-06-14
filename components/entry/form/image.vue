<template>
    
    <div class="col-span-full mt-7">
        <label for="cover-photo" class="block text-xl font-medium leading-6 text-sky-900"> {{ field.field_name }} <span @click="remove_field"> ※ </span> </label>
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

    const props = defineProps(['field'])

    const route = useRoute()

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
