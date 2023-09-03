<script setup>
import { onMounted, ref, watch } from 'vue';

const video = ref(null);
const playedTime = ref(0);
const totalTime = ref(0);
const played = ref(0);

const playing = ref(false);

onMounted(() => {
    video.value = document.getElementById('video');
    playedTime.value = video.value.currentTime;

    const frame = () => {
        played.value = (playedTime.value/totalTime.value)*100
        playedTime.value = video.value.currentTime;
        totalTime.value = video.value.duration;
        requestAnimationFrame(frame);
    };

    frame();
});

const changePlaying = () => {
    playing.value = !playing.value;
    if(playing.value){
        video.value.play()
    }else{
        video.value.pause()
    }
};

</script>

<template>
    <div class="w-full h-full flex flex-col items-center pt-32 overflow-auto">
        <div class="lg:w-2/3 h-full flex flex-col items-center">
            <div class="relative w-full h-full">
                <video @click="changePlaying" id="video" class="w-full h-full" src="/ww.mp4"></video>
                <div v-if="video" class="flex flex-col absolute bottom-5 p-4 bg-gray-800/30 left-0 w-full rounded-full">
                    <span class="w-full bg-white h-[1px] block">
                        <span :style="`width: ${played}%;`" class="w-[45%] bg-gray-900/50 h-[1px] block"></span>
                    </span>
                    <div class="videobuttons w-full gap-3 flex flex-row items-center">
                        <i v-if="playing" @click="changePlaying" class="fa-solid fa-pause cursor-pointer"></i>
                        <i v-else @click="changePlaying" class="fa-solid fa-play cursor-pointer"></i>
                        <div class="w-full flex flex-row items-center justify-between">
                            <span>{{ Math.floor(playedTime) }}</span>
                            <span>{{ Math.floor(totalTime) }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>