<script setup>

import { ref } from "vue";
import Auth from "../middleware/Auth";
import axios from "../axios";
import { useRouter } from "vue-router";

Auth();

const id = ref("");
const title = ref("");

const video = ref(null);
const router = useRouter();

//const allowedExts = ["MP4","AVI","M4V","MPEG","OGV","MOV","WEBM","MPG"];

/*const fileChange = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];

    let ext = file.name.split(".").pop().toUpperCase();

    if(!allowedExts.find((e) => e == ext)) return alert("not allowed ext!");

    reader.readAsDataURL(file);

    reader.addEventListener('loadstart',(e) => {
        console.log(e);
    });

    reader.addEventListener('loadend',(e) => {
        console.log(e.target.result);
        src.value = e.target.result;
    });
};*/

const err = ref("");

const submit = async() => {
    let res = await axios.post("/api/video/create",{
        id:id.value,
        title:title.value
    }).catch((e) => {
        err.value = e.response.data.message;
    });

    let data = res.data;

    if(!data.success) return err.value = data.message;

    router.push(`/video/${data.video.id}`);
};

const modal = ref(false);
const see = ref(false);

const openModal = () => {
    modal.value = !modal.value;
};

const openSee = () => {
    see.value = !see.value;
};
</script>

<template>
    <div v-if="modal" class="lg:w-2/3 w-full h-full fixed top-0 left-0 right-0 mx-auto overflow-auto flex flex-col bg-black/50 z-50">
        <div class="w-full flex flex-row items-center justify-between p-6 bg-black/30">
            <span>How To Get YouTube Video Id</span>
            <span class="cursor-pointer bg-red-600 hover:bg-red-800 duration-300 py-2 px-4 rounded" @click="openModal">X</span>
        </div>
        <div class="w-full flex flex-col p-6 gap-2">
            <span class="font-bold text-xl">Step 1</span>
            <span>First you have to copy the link of the video on youtube. To do this, open the video and right-click on it once, then click the "Copy Video URL" button once.</span>
            <img src="/modal1.png" draggable="false" class="w-full lg:w-1/2 mx-auto" alt="">
            <span>The url scheme copied to the clipboard should be: <span class="font-bold text-blue-600">https://youtu.be/E39GIy</span></span>
            <span>After "https://youtu.be/" is your video id. For example, the id in this video is <span class="text-blue-500">"E39GIy".</span></span>
        </div>
    </div>
    <div v-if="see" class="lg:w-2/3 w-full h-full fixed top-0 left-0 right-0 mx-auto overflow-auto flex flex-col bg-black/50 z-50">
        <div class="w-full flex flex-row items-center justify-between p-6 bg-black/30">
            <span>PreView</span>
            <span class="cursor-pointer bg-red-600 hover:bg-red-800 duration-300 py-2 px-4 rounded" @click="openSee">X</span>
        </div>
        <div class="w-full h-full flex flex-col p-6">
            <iframe class="w-full h-full" :src="`https://www.youtube.com/embed/${id}`" title="no" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
    </div>
    <div class="w-full h-full flex flex-col items-center pt-32 pb-4 overflow-auto">
        <form @submit.prevent="submit" class="lg:w-2/3 w-full h-full flex flex-col items-center justify-center gap-5">
            <span class="text-2xl font-bold">Upload Video</span>
            <input type="text" placeholder="title" class="w-full" maxlength="32" v-model="title">
            <div class="flex flex-row items-center w-full bg-[rgb(37,37,37)] py-1 px-2 rounded">
                <input type="text" placeholder="youtube video id" class="w-full p-0" v-model="id">
                <i class="fa-solid fa-question cursor-pointer" @click="openModal('HowToGetYoutubeVideoId')"></i>
                <i class="fa-solid fa-eye ml-4 cursor-pointer" @click="openSee()"></i>
            </div>
            <!--<input class="w-full" type="file" accept="video/*" @change="fileChange">-->
            <!--<iframe class="w-full h-full" :src="`https://www.youtube.com/embed/${id}`" title="no" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>-->
            <!--<video ref="video" class="w-full h-1/2" controls :src="src"></video>--->
            <button class="classic_rounded_btn" type="submit">Upload</button>
            <span class="w-full" v-if="err">{{ err }}</span>
        </form>
    </div>
</template>