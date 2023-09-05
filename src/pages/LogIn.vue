<script setup>

import axios, { initAxios } from "../axios";
import {ref} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import NoAuth from "../middleware/NoAuth";
import Loading from "../components/Loading.vue";

NoAuth();

const email = ref("");
const password = ref("");

const loadingReq = ref(false);

const err = ref(null);

const router = useRouter();
const store = useStore();

const submit = async() => {
    loadingReq.value = true;

    let res = await axios.post("/api/auth/login",{
        email:email.value,
        password:password.value
    }).catch((err) => {
        loadingReq.value = false;
        err.value = e.response.data.message;
    });

    let data = res.data;

    if(!data.success) {
        loadingReq.value = false;
        return err.value = data.message;
    }

    store.commit("setAuth",{
        loggedIn:true,
        user:data.user
    });

    store.commit("setToken",data.token);

    initAxios(data.token);

    localStorage.setItem("token",data.token);

    loadingReq.value = false;

    router.push("/");
};

</script>

<template>
    <div class="w-full h-full flex flex-col items-center">
        <form @submit.prevent="submit" class="lg:w-2/3 w-full h-full flex flex-col items-center justify-center gap-5 overflow-auto lg:pt-10">
            <h1 class="text-2xl font-bold">Log In</h1>
            <input class="w-full" type="text" placeholder="email" v-model="email">
            <input class="w-full" type="text" placeholder="password" v-model="password">
            <div v-if="loadingReq" class="w-full flex items-center justify-center">
                <Loading/>
            </div>
            <button v-else class="classic_rounded_btn">Log In!</button>
            <span class="w-full" v-if="err">{{ err }}</span>
        </form>
    </div>
</template>
