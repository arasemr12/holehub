<script setup>

import { onMounted, ref } from 'vue';
import Video from '../components/Video.vue';
import axios from 'axios';
import Loading from '../components/Loading.vue';

const videos = ref([]);
const page = ref(0);
const main = ref(null);
const loadingNewPosts = ref(false);
const loadedMaxPosts = ref(false);

const getVideos = async() => {
    let res = await axios.get(`/api/video/news?page=${page.value}`);
    let data = res.data;
    if(data.find.length < 1) return loadedMaxPosts.value = true;
    videos.value = [...videos.value,...data.find];
};

getVideos();

const scroll = async() => {
    if(loadedMaxPosts.value || loadingNewPosts.value || (main.value.scrollTop+main.value.clientHeight) < main.value.scrollHeight-100) return;
    loadingNewPosts.value = true;
    
    page.value++;
    await getVideos();

    loadingNewPosts.value = false;
};

</script>

<template>
    <div v-if="videos.length < 1" class="w-full h-full flex items-center justify-center">
        <Loading/>
    </div>
    <div v-else ref="main" @scroll="scroll" class="w-full h-full overflow-auto pt-48">
        <span class="text-2xl font-bold m-4">New Hole Videos</span>
        <div class="flex flex-row flex-wrap items-center w-full h-full">
            <Video v-for="video in videos" :key="video.id" :video="video"/>
        </div>
    </div>
</template>