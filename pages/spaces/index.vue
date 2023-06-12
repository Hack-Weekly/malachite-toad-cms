<template>
    <section>

        <div class="container mx-auto px-16 py-12 text-sky-800">
            
            <div class="grid grid-cols-5 gap-4">
                <div class="col-span-1 font-semibold -center"> Title </div>
                <div class="col-span-1 font-semibold -center"> Collaborators </div>
                <div class="col-span-1 font-semibold -center"> Slug </div>
                <div class="col-span-1 font-semibold -center"> Last updated </div>
                <div class="col-span-1 flex justify-end -center">
                    <button type="button" @click="openDialog('createEntryDialog')" class="lg:text-md -mt-6 flex items-center justify-center rounded bg-sky-800 px-3 py-2 text-sm font-normal text-white hover:bg-sky-900 lg:px-6 lg:py-3">
                        Add Space
                    </button>
                </div>
            </div>

            <!-- Create entry dialog -->    
            <dialog id="createEntryDialog">
                <div class="bg-sky-800 flex justify-between items-center">
                    <h2 class="text-white text-2xl px-8 py-6">Create a new space</h2>
                    <button type="button" @click="closeDialog('createEntryDialog')" class="text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="relative max-w-md lg:max-w-lg lg:ml-16 mt-12 px-3">
                    <Form v-slot="{ values }" @submit="onSubmit()" method="post">
                        <div>
                            <label class="text-sky-800 text-sm font-semibold">Space name</label>
                            <Field type="text" v-model="spaceName" name="spaceName" placeholder="Enter an entry name here" id="entryNameInput" class="bg-gray-200 rounded-lg outline-none ring-0 focus:ring-0 px-4 py-2.5 w-full block transition ease-linear delay-50 mt-1"/>
                            <span class="text-red-500 text-sm font-semibold" v-if="errorSpaceName">{{ errorSpaceName }}</span>
                        </div>
                        <div class="mt-3">
                            <label class="text-sky-800 text-sm font-semibold">Space slug</label>
                            <input type="text" v-model="spaceSlug" readonly  id="spaceSlugInput" class="bg-gray-200 text-gray-500 rounded-lg outline-none ring-0 focus:ring-0 px-4 py-2.5 w-full block transition ease-linear delay-50 mt-1"/>
                        </div>
                        <button type="submit" class="bg-sky-800 text-sm font-semibold w-32 text-white py-2 px-3 rounded mt-3">Create</button>
                    </Form>
                </div>
            </dialog>
            <!-- Create entry dialog end -->


            <div class="overflow-x-scroll lg:overflow-hidden">

                <div class="mt-12 grid grid-cols-[repeat(5,minmax(max-content,1fr))] gap-4" v-for="space in spaces.res" :key="space._id">
                    <SpaceDialog :space="space.space" @deleted-space="deletedSpace"/>
                    <div class="col-span-1 flex flex-col -center">
                        <span>{{ space.space.name }}</span>
                    </div>

                    <div class="col-span-1 flex -space-x-1.5 -center">
                        <div class="flex" v-for="user in space.users" :key="user._id">
                            <img :src="user.picture" :title="user.username" alt="user_pfp" class="w-8 h-8 rounded-full">
                        </div>
                    </div>

                    <div class="col-span-1 -center">{{ space.space.slug }}</div>
                    <span class="col-span-1 -center text-sm text-gray-400">{{formattedDate(space.space.updated_at)}}</span>
                    <div class="col-span-1 flex -center">
                        <svg @click="openDialog('settingsDialog')" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                            />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
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

    const { data } = useAuth()

    const { data: response } =  await useFetch('/api/space/get', {
        onRequest({ request, options}) { 
            options.method = 'POST'
            options.headers = { "Content-type": "application/json" };
            options.body = JSON.stringify({ email: data?.value?.user?.email })
        }
    })

    let spaces = ref(response.value)

    /* Function that is emitted from the dialog component when a space is deleted */
    const getSpaces = async () => {
        const { data: response } =  await useFetch('/api/space/get', {
            onRequest({ request, options}) { 
                options.method = 'POST'
                options.headers = { "Content-type": "application/json" };
                options.body = JSON.stringify({ email: data?.value?.user?.email })
            }
        })

        spaces.value = response.value
    }


    const formattedDate = (date: string) => spaces ? new Date(date).toISOString().substring(0, 10) : date;

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
    
    const { value: spaceName, errorMessage: errorSpaceName } = useField('spaceName', validate, {
          validateOnValueUpdate: false,
    })

    // RegEx to convert entry name to slug
    // It can't contain any special characters, spaces, uppercase letters, or numbers
    
    const spaceSlug = computed(() => spaceName.value ? (spaceName.value as string).toLowerCase().replace(/[^a-z-]/g, '-').replace(/^-+|-+$|-+(?=-)/g, '') : '');


    const onSubmit = handleSubmit(async(values) => {
        if(data) {
            const { data: response } = await useFetch('/api/space/create', {
                onRequest({ request, options}) { 
                    options.method = 'POST'
                    options.headers = { "Content-type": "application/json" };
                    options.body = JSON.stringify({ 
                        email: data?.value?.user?.email,
                        space_name: spaceName.value,
                        space_slug: spaceSlug.value
                    })
                },
                onRequestError({ request, options, error }) {
                    toast.error('Something went wrong. Please try again later')
                },
                async onResponse({ request, response, options }) {
                    toast.success('Space created successfully')
                    closeDialog('createEntryDialog')
                    await getSpaces()
                },
            })

            spaceName.value = ''
        }
    });

</script>

<style scoped>
    dialog {
        width: 50% !important;
        height: 50% !important;
    }
</style>
