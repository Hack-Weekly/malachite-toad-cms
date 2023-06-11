<template>
    
    <div class="-center-col w-full h-screen">

        <!-- the header is here -->
        <div class="header w-full h-20 bg-sky-950">
            <div class="logo h-full text-xl flex justify-start items-center pl-10 text-white">
                <h1> Malachite Toad <span class="text-sky-400"> CMS </span> </h1>
            </div>
        </div>
        <!-- the header end  here -->

        <!-- this div hold the sidebar in the left side and the page in the right side -->
        <div class="w-full h-full flex overflow-hidden">

            <sidebar />

            <!-- the page lives here -->
            <div class="w-full h-full bg-gray-200 overflow-y-auto">
                <slot />
            </div>
        </div>

    </div>

</template>