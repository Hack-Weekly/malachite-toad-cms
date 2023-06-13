<template>
    
    <div class="form w-full h-full flex-col px-2">

    <div class="mt-9 flex items-center justify-start gap-x-6 border-t py-4 border-gray-300">
        <button type="submit" class="rounded bg-sky-900 px-6 py-3 text-xl indepth_custome_shadow text-white hover:border-sky-800 hover:border hover:bg-transparent hover:shadow-none hover:text-sky-800 transition-all duration-500">Save</button>
        <button type="button" class="text-sm font-semibold leading-6 text-sky-800">Cancel</button>
    </div>

    <div class="mt-6 w-full h-10"></div>

</div>

</template>

<script setup lang="ts">
    
    const route = useRoute()

    async function onSubmit() {
        const response = await $fetch('/api/entry/get_all_fields', {
            method: 'post',
            body: {
                entry_slug: route.params.entry,
            }
        })
        console.log(response)
    }

    onSubmit()

</script>
