<script setup>

import {useRoute} from "vue-router";
import axios from "../axios";
import {ref,onMounted} from "vue";
import Loading from "../components/Loading.vue";

const route = useRoute();

const {id} = route.params;

const find = ref(null);
const loading = ref(true);
const main = ref(null);
const err = ref("");

onMounted(async() => {
    let res = await axios.get(`/api/video/${id}`);
    let data = res.data;

    loading.value = false;

    if(!data.success) return err.value = data.message;

    find.value = data.find;
});

</script>

<template>
    <div v-if="loading" class="w-full h-full flex items-center justify-center">
        <Loading/>
    </div>
    <div v-else-if="find" ref="main" class="w-full h-full flex flex-col items-center justify-center pt-32">
        <iframe class="w-full h-full" :src="`https://www.youtube.com/embed/${find.videoId}`" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>
    <div class="w-full h-full flex flex-col items-center" v-else>
        <div class="lg:w-2/3 h-full flex items-center justify-center">
            <span class="py-2 px-4 bg-red-100 text-red-600 rounded-full w-full">
                {{ err }}
            </span>
        </div>
    </div>
</template>