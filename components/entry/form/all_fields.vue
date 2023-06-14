<template>
    
    <div class="form w-full h-full flex-col px-2">
        
        <div v-if="fields">
            <component :is="component_holder[field.field_type]" v-for="field in all_fields" :key="field.field_type" :field="field"  @input_emit="handle_emit($event, field.field_name)"/>
        </div>

    <div class="mt-9 flex items-center justify-start gap-x-6 border-t py-4 border-gray-300">
        <button type="submit" class="rounded bg-sky-900 px-6 py-3 text-xl indepth_custome_shadow text-white hover:border-sky-800 hover:border hover:bg-transparent hover:shadow-none hover:text-sky-800 transition-all duration-500" @click='onSubmit'>Save</button>
        <button type="button" class="text-sm font-semibold leading-6 text-sky-800">Cancel</button>
    </div>

    <div class="mt-6 w-full h-10"></div>

</div>

</template>

<script setup lang="ts">

    const fields_values: any = ref({})

    const component_holder = ref({
        text : resolveComponent('EntryFormText'),
        area : resolveComponent('EntryFormArea'),
        date : resolveComponent('EntryFormDate'),
        media : resolveComponent('EntryFormImage')
    })

    const route = useRoute()

    const all_fields = useState('fields', () => '')

    let fields: any = await $fetch('/api/entry/get_all_fields', {
        method: 'post',
        body: {
            entry_slug: route.params.entry,
        }
    })

    all_fields.value = fields?.res

    function handle_emit(inputValue: any, field_name: string) {
        fields_values.value[field_name] = inputValue
    }

    async function onSubmit() {

        const response = await $fetch('/api/entry/create_content', {
            method: 'post',
            body: {
                entry_slug: route.params.entry,
                content: fields_values.value
            }
        })

        if(response) {
            
            let all_contents = useState('contents')

            let contents: any = await $fetch('/api/entry/get_all_contents', {
                method: 'post',
                body: {
                    entry_slug: route.params.entry,
                }
            })

            all_contents.value = contents?.res

        }
        
    }

</script>
