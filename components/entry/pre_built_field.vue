<template>

    <div class="pre_built_field w-full max-lg:w-full py-2 border-gray-300 border-2 flex hover:bg-sky-800 hover:border-white/80 group transition-all duration-500 justify-start items-center pl-4 gap-x-4 bg-white rounded" @click="change_field_type(data.title, $event)">
        <div class="w-12 h-8 rounded -center border-2 text-white" :style="` background: ${data.color} `">
            <i class="fa-solid fa-t"></i>
        </div>
        <div>
            <h1 class="text-sky-400 font-bold group-hover:text-white capitalize"> {{ data.title }} </h1>
            <p class="text-gray-400 text-sm group-hover:text-white transition-all duration-500"> {{ data.description }} </p>
        </div>
    </div>

</template>

<script setup lang="ts">

    const props = defineProps(['data'])

    const field_type = useState('field_type')

    async function change_field_type(type: string, e: any) {
        if(process.client) {
            const type_el = e.currentTarget
            const els = document.getElementsByClassName('pre_built_field')
            const modi_el = Array.from(els).map( el => {
                el.classList.remove('pre_built_field_active')
            })
            if(field_type.value == type) {
                field_type.value = ''
                e.currentTarget.classList.remove('pre_built_field_active')
            } else if(field_type.value) {
                type_el.classList.toggle('pre_built_field_active');
                field_type.value = type
            }
            else {
                type_el.classList.toggle('pre_built_field_active');
                field_type.value = type
            }
        }
    }

</script>

<style scoped>

    .pre_built_field_active {
        background: rgb(7, 89, 133);
        color: white;
    }

</style>