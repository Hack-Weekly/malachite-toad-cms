<template>
    <section>
        <div class="container mx-auto px-16 py-12 text-sky-800">
            <div class="grid grid-cols-5 gap-4">

                <div class="col-span-1 font-semibold -center">Page title</div>
                <div class="col-span-1 font-semibold -center">Slug</div>
                <div class="col-span-1 font-semibold -center">Last updated</div>
                <div class="col-span-1 font-semibold -center">Status</div>
                <div class="col-span-1 flex justify-end ">
                    <button type="button" @click="openDialog('createEntryDialog')" class="lg:text-md -mt-6 flex items-center justify-center rounded bg-sky-800 px-3 py-2 text-sm font-normal text-white hover:bg-sky-900 lg:px-6 lg:py-3">Create entry</button>
                </div>
                
            </div>

            <!-- Create entry dialog -->    
            <dialog id="createEntryDialog">
                <div class="bg-sky-800 flex justify-between items-center">
                    <h2 class="text-white text-2xl px-8 py-6">Create a new entry</h2>
                    <button type="button" @click="closeDialog('createEntryDialog')" class="text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="relative max-w-md lg:max-w-lg lg:ml-16 mt-12 px-3">
                    <Form v-slot="{ values }" @submit="onSubmit()" method="post">
                        <div>
                            <label class="text-sky-800 text-sm font-semibold">Entry name</label>
                            <Field type="text" v-model="entryName" name="entryName" placeholder="Enter an entry name here" id="entryNameInput" class="bg-gray-200 rounded-lg outline-none ring-0 focus:ring-0 px-4 py-2.5 w-full block transition ease-linear delay-50 mt-1"/>
                            <span class="text-red-500 text-sm font-semibold" v-if="errorEntryName">{{ errorEntryName }}</span>
                        </div>
                        <div class="mt-3">
                            <label class="text-sky-800 text-sm font-semibold">Entry slug</label>
                            <input type="text" v-model="entrySlug" readonly  id="entrySlugInput" class="bg-gray-200 text-gray-500 rounded-lg outline-none ring-0 focus:ring-0 px-4 py-2.5 w-full block transition ease-linear delay-50 mt-1"/>
                        </div>
                        <button type="submit" class="bg-sky-800 text-sm font-semibold w-32 text-white py-2 px-3 rounded mt-3">Create</button>
                    </Form>
                </div>
            </dialog>
            <!-- Create entry dialog end -->

            <div class="overflow-x-scroll lg:overflow-hidden">
                <div class="mt-12 grid grid-cols-[repeat(5,minmax(max-content,1fr))] gap-4" v-for="entry in entry.res" :key="entry._id">

                    <div class="col-span-1 -center">
                        <NuxtLink :to="`${$route.params.space}/${entry.slug}`">{{ entry.name }}</NuxtLink>
                    </div>

                    <div class="col-span-1 -center"> {{ entry.slug }} </div>

                    <div class="col-span-1 -center"> {{ formattedDate(entry.updated_at) }} </div>

                    <div class="col-span-1 -center">
                        <span class="rounded-full bg-green-300 px-5 py-1 text-white">Published</span>
                    </div>

                    <div class="col-span-1 flex justify-end">
                        <button class="py-2 px-8 rounded bg-red-700 border-2 border-gray-200 text-white" @click="remove_entry(entry.slug)"> Remove </button>
                    </div>

                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
    import { onMounted } from 'vue';
    import { useForm, useField, Form, Field } from 'vee-validate';
    import { toast } from 'vue3-toastify';
    import 'vue3-toastify/dist/index.css';

    const route = useRoute()

    const { data: response } =  await useFetch('/api/entry/get', {
        onRequest({ request, options}) { 
            options.method = 'POST'
            options.headers = { "Content-type": "application/json" };
            options.body = JSON.stringify({ space_slug: route.params.space })
        }
    })

    let entry = ref(response.value)

    const formattedDate = (date: string) => entry ? new Date(date).toISOString().substring(0, 10) : date;

    /* Function that is emitted from the dialog component when a space is deleted */
    const getSpaces = async () => {
        const { data: response } =  await useFetch('/api/entry/get', {
            onRequest({ request, options}) { 
                options.method = 'POST'
                options.headers = { "Content-type": "application/json" };
                options.body = JSON.stringify({ space_slug: route.params.space })
            }
        })

        entry.value = response.value
    }

    function openDialog(id: string) {
        const dialog = document.getElementById(id);
        const dialogElement = dialog as HTMLDialogElement;
        dialogElement.showModal();
    }

    function closeDialog(id: string) {
        const dialog = document.getElementById(id);
        const dialogElement = dialog as HTMLDialogElement;
        dialogElement.close();
    }
    
    const { handleSubmit } = useForm();

    const validate = (value?: string) => {

        if(!value) return 'This field is required'

        if(value.length < 3) return 'This Field must be greater than 3 characters'

        return true
    };
    
    const { value: entryName, errorMessage: errorEntryName } = useField('entryName', validate, {
          validateOnValueUpdate: false,
    })

    // RegEx to convert entry name to slug
    // It can't contain any special characters, spaces, uppercase letters, or numbers
    
    const entrySlug = computed(() => entryName.value ? (entryName.value as string).toLowerCase().replace(/[^a-z-]/g, '-').replace(/^-+|-+$|-+(?=-)/g, '') : '');

    const onSubmit = handleSubmit(async (values) => {
        const { data: response } = await useFetch('/api/entry/create', {
                onRequest({ request, options}) { 
                    options.method = 'POST'
                    options.headers = { "Content-type": "application/json" };
                    options.body = JSON.stringify({ 
                        space_slug: route.params.space,
                        name: entryName.value,
                        slug: entrySlug.value
                    })
                },
                onRequestError({ request, options, error }) {
                    toast.error('Something went wrong. Please try again later')
                },
                async onResponse({ request, response, options }) {
                    toast.success('Entry created successfully')
                    getSpaces()
                    closeDialog('createEntryDialog')
                },
            })
    });

    async function remove_entry(slug: any) {

        const response = await $fetch('/api/entry/remove_entry', {
            onRequest({ request, options, error}) {
                options.method = 'POST'
                options.headers = { "Content-type": "application/json" };
                options.body = {
                    entry_slug: slug,
            }},
            onResponse({ response, options }) {
                toast.success('Entry removed successfully')
            },
            onRequestError({request, options, error}) {
                toast.error('Something went wrong. Please try again later')
            },
            onResponseError(context) {
                toast.error('Something went wrong. Please try again later')
            },
        })

        getSpaces()        
    }


</script>

<style scoped>
    dialog {
        width: 50% !important;
        height: 50% !important;
    }
</style>
