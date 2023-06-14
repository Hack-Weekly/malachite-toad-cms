<template>
    
    <div class="element_preview bg-white w-full px-3 py-1.5 rounded flex justify-between border-2 border-gray-300 items-center text-base text-sky-900">
        <p> {{ content }}  </p>
        <i class="fa-regular fa-trash-can flash" @click="remove_field"></i>
    </div>

</template>

<script setup lang="ts">

    const props = defineProps(['content'])

    const route = useRoute()

    async function remove_field() {

        const response = await $fetch('/api/entry/remove_content', {
            method: 'post',
            body: {
                entry_slug: route.params.entry,
                content: props.content.content
            }
        })

        if(response) {
            
            let all_contents = useState('contents')

            let content: any = await $fetch('/api/entry/get_all_contents', {
                method: 'post',
                body: {
                    entry_slug: route.params.entry,
                }
            })

            all_contents.value = content?.res

        }

    }

</script>
