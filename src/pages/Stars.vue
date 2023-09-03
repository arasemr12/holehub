<script setup>

import axios from "../axios";
import {ref} from "vue";

const users = ref([]);

const get = async() => {
    let res = await axios.get("/api/user/");
    let data = res.data;

    if(!data.success) return;

    users.value = [...users.value,...data.find];
};

get();

</script>

<template>
    <div class="w-full h-full flex flex-col items-center overflow-auto">
        <div class="lg:w-2/3 w-full h-full flex flex-col items-center pt-32 gap-5">
            <span class="text-2xl font-bold">Hole Stars</span>
            <div class="w-full flex flex-row items-center justify-between flex-wrap gap-y-4">
                <RouterLink :to="`/user/${user.id}`" class="w-full lg:w-[45%] bg-[rgb(45,44,44)] gap-3 p-4 flex flex-col items-center rounded-lg" v-for="user in users" :key="user.id">
                    <img src="/profile.webp" class="rounded-full" width="64" alt="">
                    <span>{{ user.username }}</span>
                    <span>TOTAL VIEWERS: {{ user.viewers }}</span>
                </RouterLink>
            </div>
        </div>
    </div>
</template>