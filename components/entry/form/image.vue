<template>
    
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

</template>