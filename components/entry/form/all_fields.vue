<template>
    
    <div class="form w-full h-full flex-col px-2">
        
        <div v-if="fields">
            <component :is="component_holder[field.field_type]" v-for="field in all_fields" :key="field.field_type" :field="field" />
        </div>

    <div class="mt-9 flex items-center justify-start gap-x-6 border-t py-4 border-gray-300">
        <button type="submit" class="rounded bg-sky-900 px-6 py-3 text-xl indepth_custome_shadow text-white hover:border-sky-800 hover:border hover:bg-transparent hover:shadow-none hover:text-sky-800 transition-all duration-500">Save</button>
        <button type="button" class="text-sm font-semibold leading-6 text-sky-800">Cancel</button>
    </div>

    <div class="mt-6 w-full h-10"></div>

</div>

</template>

<script setup lang="ts">

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

</script>
