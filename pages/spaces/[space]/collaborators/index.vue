<template>
    <section>
        <div class="container mx-auto px-16 py-12 text-sky-800">
            <div class="grid grid-cols-4 gap-4">
                <div class="col-span-1 font-semibold -center">Name</div>
                <div class="col-span-1 font-semibold -center">Email</div>
                <div class="col-span-1 font-semibold -center">Role</div>
                <div class="col-span-1 flex justify-end">
                    <button type="button" @click="openDialog('addCollaborator')" class="lg:text-md -mt-6 flex items-center justify-center rounded bg-sky-800 px-3 py-2 text-sm font-normal text-white hover:bg-sky-900 lg:px-6 lg:py-3">
                        Add user
                    </button>
                </div>
            </div>

            <!-- Create entry dialog -->
            <dialog id="addCollaborator">
                <div class="bg-sky-800 flex justify-between items-center">
                    <h2 class="text-white text-2xl px-8 py-6">Add user</h2>
                    <button type="button" @click="closeDialog('addCollaborator')" class="text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="relative max-w-md lg:max-w-lg lg:ml-16 mt-12 px-3">
                    <Form v-slot="{ values }" @submit="onSubmit()" method="post">
                        <div>
                            <label class="text-sky-800 text-sm font-semibold">Email</label>
                            <Field
                                type="email"
                                v-model="email"
                                name="email"
                                placeholder="Enter an email here"
                                id="emailInput"
                                class="bg-gray-200 rounded-lg outline-none ring-0 focus:ring-0 px-4 py-2.5 w-full block transition ease-linear delay-50 mt-1"
                            />
                            <select name="roles" @change="selectRole($event.target.value)" v-model="selectedRole" class="mt-3 py-3 px-4 pr-9 block w-full border border-gray-300 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500">
                                <option disabled>Select a role</option>y
                                <option v-for="role in roles" :value="role.name">{{role.name}}</option>
                            </select>
                            <span class="text-red-500 text-sm font-semibold" v-if="errorEmail">{{ errorEmail }}</span>
                        </div>
                        <button type="submit" class="bg-sky-800 text-sm font-semibold w-32 text-white py-2 px-3 rounded mt-3">Add user</button>
                    </Form>
                </div>
            </dialog>
            <!-- Create entry dialog end -->

            <div class="overflow-x-scroll lg:overflow-hidden">
                <div class="mt-12 grid grid-cols-[repeat(4,minmax(max-content,1fr))] gap-4" v-for="user in users" :key="user._id">
                    <div class="col-span-1 -center">
                        <span>{{ user.username }}</span>
                    </div>
                    <div class="col-span-1 -center">
                        <span>{{ user.email }}</span>
                    </div>
                    <div class="col-span-1 -center">
                        <span>
                            {{ user.role }}
                        </span>
                    </div>
                    <form method="post" @submit.prevent="removeUser(user._id)" class="col-span-1 flex justify-end">
                        <button type="submit" class="py-2 px-8 rounded bg-red-700 text-white" :disabled="collaborators.res[1].some((role) => role.role === 'owner' && role.user_id === user._id)" :class="collaborators.res[1].some((role) => role.role === 'owner' && role.user_id === user._id) ? 'opacity-50' : 'opacity-100'">
                            Remove
                        </button>
                    </form>
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

    const route = useRoute();
    const { data: response } = await useFetch('/api/space/collaborators/get', {
        onRequest({ request, options}) {
            options.method = 'POST'
            options.headers = { "Content-type": "application/json" };

            options.body = JSON.stringify({ spaceId: route.query.spaceId });
        }
    })

    let collaborators = ref(response.value)


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

    const users = computed(() => {
        return collaborators.value.res[0].map(user => {
            const role = collaborators.value.res[1].find(role => role.user_id === user._id);
            return {
                ...user,
                role: role ? role.role : ''
            }
        });
    });

    const { handleSubmit } = useForm();

    // Validate the form

    const validate = (value?: string) => {

        if(!value) return 'This field is required'

        if(value.length < 3) return 'This Field must be greater than 3 characters'

        //regex for email validation
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!regex.test(value)) return 'Please enter a valid email address'

        return true
    };

    const roles = ref([
        { name: 'admin' },
        { name: 'editor' },
    ])

    let selectedRole = ref('editor')

    const selectRole = (role: string) => {
        selectedRole.value = role
    }
    const { value: email, errorMessage: errorEmail } = useField('email', validate, {
          validateOnValueUpdate: false,
    })

    // Add user
    const onSubmit = handleSubmit(values => {
        const { data, error } = useFetch('/api/space/collaborators/create', {
            onRequest({ request, options}) {
                options.method = 'POST'
                options.headers = { "Content-type": "application/json" };
                
                options.body = JSON.stringify({ spaceId: route.query.spaceId, email: values.email, role: selectedRole.value });
            },
            onResponse({ response, options }) {
                
                if(response.status === 200) {
                    collaborators.value = response._data  
                    toast.success('Added collaborator successfully')      
                }
            },
            onResponseError({ error, options }) {
                toast.error('Something went wrong')
            },
            onRequestError({ error, options }) {
                toast.error('Something went wrong')
            }
        })
    });

    const removeUser = (async(id: string) => {
        const { data, error } = useFetch('/api/space/collaborators/delete', {
            onRequest({ request, options}) {
                options.method = 'POST'
                options.headers = { "Content-type": "application/json" };
                
                options.body = JSON.stringify({ spaceId: route.query.spaceId, userId: id });
            },
            onResponse({ response, options }) {
                
                if(response.status === 200) {
                    collaborators.value = response._data
                    toast.success('Removed collaborator successfully')      

                }
            },
            onResponseError({ error, options }) {
                toast.error('Something went wrong')
            },
            onRequestError({ error, options }) {
                toast.error('Something went wrong')
            }
        })
    })
</script>

<style scoped>
    dialog {
        width: 50% !important;
        height: 50% !important;
    }
</style>
