<template>
    
    <div class="elements-holder w-full py-4 flex justify-center items-start flex-col px-2 gap-y-4">

        <h1 class="left-side-title text-xl font-bold text-sky-900"> All Contents ※ </h1>

        <EntryContentsPreview v-for="content in all_contents" :key="content" :content="content" />

    </div>

</template>

<script setup lang="ts">

    const route = useRoute()

    const all_contents = useState('contents', () => '')

    let contents: any = await $fetch('/api/entry/get_all_contents', {
        method: 'post',
        body: {
            entry_slug: route.params.entry,
        }
    })

    all_contents.value = contents?.res

</script>
