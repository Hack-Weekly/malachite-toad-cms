<template>
    
    <div class="mini_nav w-full h-20 border-b-4 border-gray-100 flex justify-between items-center px-4">
        
        <button class="return_to_spaces_btn indepth_custome_shadow bg-sky-800 flex justify-center items-center gap-x-4 rounded py-3 px-6 text-lg text-white hover:bg-transparent hover:border-sky-800 hover:border hover:text-sky-800 transition-all duration-500 hover:shadow-none group">
            <i class="fa-solid fa-angle-left"></i> <span class="text-white/30 group-hover:text-sky-400"> | </span> <p class=""> Space </p>
        </button>

        <button class="return_to_spaces_btn indepth_custome_shadow bg-sky-800 flex justify-center items-center gap-x-4 rounded py-3 px-6 text-lg text-white hover:bg-transparent hover:border-sky-800 hover:border hover:text-sky-800 transition-all duration-500 hover:shadow-none group">
            <i class="fa-solid fa-plus"></i> <span class="text-white/30 group-hover:text-sky-400"> | </span> <p class=""> Add Field </p>
        </button>

    </div>

    <div class="entries_container w-full h-full -center p-8 px-8 gap-y-4">

        <div class="left-side w-72 min-w-[288px] h-full">
            
            <div class="w-full py-4 flex justify-center items-start flex-col px-2 gap-y-4">
                <h1 class="text-xl font-bold text-sky-900"> All Entries ※ </h1>
                <div class="bg-white w-full px-3 py-1.5 rounded flex justify-between border-2 border-gray-300 items-center text-base text-sky-900">
                    <p> text <span class="text-gray-300"> 〜 </span> food-name  </p>
                    <i class="fa-regular fa-trash-can flash"></i>
                </div>
                <div class="bg-white w-full px-3 py-1.5 rounded flex justify-between border-2 border-gray-300 items-center text-base text-sky-900">
                    <p> area <span class="text-gray-300"> 〜 </span> food-description  </p>
                    <i class="fa-regular fa-trash-can flash"></i>
                </div>
                <div class="bg-white w-full px-3 py-1.5 rounded flex justify-between border-2 border-gray-300 items-center text-base text-sky-900">
                    <p> number <span class="text-gray-300"> 〜 </span> food-price  </p>
                    <i class="fa-regular fa-trash-can flash"></i>
                </div>
                <div class="bg-white w-full px-3 py-1.5 rounded flex justify-between border-2 border-gray-300 items-center text-base text-sky-900">
                    <p> image <span class="text-gray-300"> 〜 </span> food-image  </p>
                    <i class="fa-regular fa-trash-can flash"></i>
                </div>
            </div>

        </div>

        <div class="right-side w-full h-full px-16">

            <div class="w-full h-full flex-col px-2">

                <div class="sm:col-span-3 mt-7">
                    <label for="first-name" class="block text-xl font-medium leading-6 text-sky-900"> Food Name ※ </label>
                    <div class="mt-2">
                    <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-2 border-gray-300 py-1.5 text-gray-900 px-3 placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div class="col-span-full mt-7">
                    <label for="about" class="block text-xl font-medium leading-6 text-sky-900"> Food Description ※ </label>
                    <div class="mt-2">
                    <textarea id="about" name="about" rows="3" class="block w-full rounded-md py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 border-2 outline-none px-3 border-gray-300" />
                    </div>
                </div>

                <div class="sm:col-span-2 mt-7">
                    <label for="postal-code" class="block text-xl font-medium leading-6 text-sky-900"> Food Price ※ </label>
                    <div class="mt-2"> 
                    <input type="text" name="postal-code" id="postal-code" autocomplete="postal-code" class="block w-full rounded-md border-2 py-1.5 text-gray-900 border-gray-300 outline-none px-3 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div class="col-span-full mt-7">
                    <label for="cover-photo" class="block text-xl font-medium leading-6 text-sky-900"> Cover photo ※ </label>
                    <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div class="text-center">
                        <PhotoIcon class="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                        <div class="mt-4 flex text-sm leading-6 text-gray-600">
                        <label for="file-upload" class="relative cursor-pointer rounded ">
                            <span>Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" class="sr-only" />
                        </label>
                        <p class="pl-1">or drag and drop</p>
                        </div>
                        <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                    </div>
                    </div>
                </div>

                <div class="mt-9 flex items-center justify-start gap-x-6 border-t py-4 border-gray-300">
                    <button type="submit" class="rounded bg-sky-900 px-6 py-3 text-xl indepth_custome_shadow text-white hover:border-sky-800 hover:border hover:bg-transparent hover:shadow-none hover:text-sky-800 transition-all duration-500">Save</button>
                    <button type="button" class="text-sm font-semibold leading-6 text-sky-800">Cancel</button>
                </div>

                <div class="mt-6 w-full h-10"></div>

            </div>

        </div>

    </div>

</template>

<style>

.indepth_custome_shadow {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
}

</style>