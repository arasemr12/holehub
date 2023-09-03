<script setup>

import {ref,onMounted} from "vue";
import axios from "../axios";
import { useRoute } from "vue-router";

import Video from "../components/Video.vue";
import Loading from "../components/Loading.vue";

const route = useRoute();

const {id} = route.params;

const user = ref(null);
const videos = ref([]);
const page = ref(0);
const loadedUser = ref(false);
const loadedVideos = ref(false);

const getVideos = async() => {
    let videoRes = await axios.get(`/api/user/${id}/videos?page=${page.value}`);
    let videoData = videoRes.data;

    videos.value = videoData.find;

    loadedVideos.value = true;
};

(async() => {
    let res = await axios.get(`/api/user/${id}`);
    let data = res.data;

    user.value = data.find;

    loadedUser.value = true;

    getVideos();
})();

</script>

<template>
    <div v-if="loadedUser" class="w-full h-full flex flex-col items-center overflow-auto">
        <div class="lg:w-2/3 h-full flex flex-col items-center pt-32 gap-3">
            <img src="/profile.webp" width="64" class="rounded-full" draggable="false" alt="">
            <span class="text-2xl font-bold">{{ user.username }}</span>
            <span>Total Viewers: {{ user.viewers }}</span>
            <span class="text-xl">Videos</span>
            <div class="flex flex-row flex-wrap items-center overflow-auto w-full">
                <Video v-if="loadedVideos" v-for="video in videos" :key="video.id" :video="video"/>
                <span class="text-center w-full py-2 px-4 bg-red-100 text-red-600 rounded-full" v-if="loadedVideos && videos.length < 1">No video!</span>
                <Loading v-if="!loadedVideos"/>
            </div>
        </div>
    </div>
    <div class="w-full h-full flex items-center justify-center" v-else>
        <Loading/>
    </div>
</template>
