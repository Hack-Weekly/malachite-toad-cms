<template>
    
    <div class="form w-full h-full flex-col px-2">
        
        <ClientOnly v-if="fields">
            <component :is="component_holder[field.field_type]" v-for="field in all_fields" :key="field" :field="field"  @input_emit="handle_emit($event, field.field_name)"/>
        </ClientOnly>

    <div class="mt-9 flex items-center justify-start gap-x-6 border-t py-4 border-gray-300">
        <button type="submit" class="rounded bg-sky-900 px-6 py-3 text-xl indepth_custome_shadow text-white hover:border-sky-800 hover:border hover:bg-transparent hover:shadow-none hover:text-sky-800 transition-all duration-500" @click='onSubmit'>Save</button>
        <button type="button" class="text-sm font-semibold leading-6 text-sky-800">Cancel</button>
    </div>

    <div class="mt-6 w-full h-10"></div>

</div>

</template>

<script setup lang="ts">

    import { toast } from 'vue3-toastify';
    import 'vue3-toastify/dist/index.css';

    let fields_values: any = shallowRef({})

    console.log(fields_values)

    const component_holder = shallowRef({
        text : resolveComponent('EntryFormText'),
        area : resolveComponent('EntryFormArea'),
        date : resolveComponent('EntryFormDate'),
        media : resolveComponent('EntryFormImage')
    })

    const route = useRoute()

    const all_fields= useState('fields', () => '')

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
            onRequest({ request, options, error}) {
                options.method = 'POST'
                options.headers = { "Content-type": "application/json" };
                options.body = {
                    entry_slug: route.params.entry,
                    content: fields_values.value
            }},
            onResponse({ response, options }) {
                toast.success('Content created successfully')
            },
            onRequestError({request, options, error}) {
                toast.error('Something went wrong. Please try again later')
            },
            onResponseError(context) {
                toast.error('Something went wrong. Please try again later')
            },
        })

        if(response) {

            fields_values.value = {}

            console.log(fields_values)

            let text_fields = document.getElementsByClassName('text-fields'),
                area_fields = document.getElementsByClassName('area-fields'),
                date_fields = document.getElementsByClassName('date-fields')

            Array.from(text_fields).map(el => {
                let input = el as HTMLInputElement;
                input.value = '';
            });

            Array.from(area_fields).map(el => {
                let textarea = el as HTMLTextAreaElement;
                textarea.value = '';
            });

            Array.from(date_fields).map(el => {
                let input = el as HTMLInputElement;
                input.value = '';
            });
            
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
