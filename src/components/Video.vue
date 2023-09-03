<script setup>

import {RouterLink} from "vue-router";

const {video} = defineProps({
    video:null
});

</script>

<template>
    <div class="lg:w-1/4 w-full flex flex-col p-4">
        <RouterLink class="w-full h-full" :to="`/video/${video.id}`" activeClass="0">
            <img draggable="false" class="w-full h-full animate-pulse rounded-lg bg-gray-600" onload="(() => {
                this.classList.remove('animate-pulse')
            })()" :src="video.thumbnail" alt="" />
        </RouterLink>
        <span>Hole</span>
        <RouterLink :to="`/user/${video.author.id}`" activeClass="0" class="text-xs text-gray-400">{{ video.author.username }}</RouterLink>
        <span class="text-xs text-gray-400">{{ video.views.length }} views</span>
    </div>
</template>