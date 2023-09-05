<script setup>

import axios from "../axios";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import NoAuth from "../middleware/NoAuth";
import Loading from "../components/Loading.vue";

NoAuth();

const email = ref("");
const username = ref("");
const password = ref("");

const loadingReq = ref(false);

const err = ref(null);

const widget = ref("");

const router = useRouter();


const submit = async() => {
    loadingReq.value = true;

    let token = grecaptcha.getResponse(widget.value);

    if(!token) {
        loadingReq.value = false;
        return err.value = "Validate captcha!";
    }

    grecaptcha.reset(widget.value);

    let res = await axios.post("/api/auth/register",{
        email:email.value,
        username:username.value,
        password:password.value,
        token
    }).catch((e) => {
        loadingReq.value = false;
        err.value = e.response.data.message;
    });

    let data = res.data;

    if(!data.success) {
        loadingReq.value = false;
        return err.value = data.message;
    };

    loadingReq.value = false;

    router.push("/log-in");
};

onMounted(() => {
    let recaptchaScript = document.createElement('script');
    recaptchaScript.setAttribute('src', 'https://www.google.com/recaptcha/api.js?onload=onloadCaptcha');
    document.head.appendChild(recaptchaScript);
});

globalThis.onloadCaptcha = () => {
    widget.value = grecaptcha.render(document.getElementById('captcha'), {
        'sitekey' : '6LfrhvAnAAAAAEYBVH1GABIzOSDFgOYo_Mnb5DtD',
        'theme':"dark"
    });
};

</script>

<template>
    <div class="w-full h-full flex flex-col items-center">
        <form @submit.prevent="submit" class="lg:w-2/3 w-full h-full flex flex-col items-center justify-center gap-5 overflow-auto pt-10">
            <h1 class="text-2xl font-bold">Sign Up</h1>
            <input class="w-full" type="text" placeholder="email" v-model="email">
            <input class="w-full" type="text" placeholder="username" v-model="username">
            <input class="w-full" type="text" placeholder="password" v-model="password">
            <div id="captcha"></div>
            <div v-if="loadingReq" class="w-full flex items-center justify-center">
                <Loading/>
            </div>
            <button v-else class="classic_rounded_btn">Sign Up!</button>
            <span class="w-full" v-if="err">{{ err }}</span>
        </form>
    </div>
</template>
