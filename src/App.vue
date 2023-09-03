<script setup>

import {RouterView, RouterLink} from "vue-router";
import {useStore} from "vuex";
import {ref, onMounted} from "vue";
import {useRouter} from "vue-router";
import axios from "./axios";
import Loading from "./components/Loading.vue";
import {initAxios} from "./axios";

initAxios(localStorage.getItem("token"));

const store = useStore();
const router = useRouter();

const state = ref(store.state);
const loading = ref(true);

onMounted(async() => {
  let token = localStorage.getItem("token");
  if(!token) {
    return loading.value = false;
  }

  let res = await axios.get("/api/auth/me").catch(() => {
    loading.value = false;
    return localStorage.removeItem("token");
  });
  let data = res.data;

  if(!data.success) {
    loading.value = false;
    return localStorage.removeItem("token");
  }

  store.commit("setAuth",{
    loggedIn:true,
    user:data.user
  });

  store.commit("setToken",token);

  setTimeout(() => {
    loading.value = false;
  }, 1000);
});

const logout = () => {
  store.commit("setAuth",{
    loggedIn:false,
    user:null
  });

  localStorage.removeItem("token");

  router.push("/");
};

const navIsOpen = ref(false);
</script>

<template>
  <div class="w-full h-full">
    <div id="nav" class="w-full lg:flex hidden flex-col fixed z-50 top-0 left-0">
      <div class='w-full bg-black flex flex-row items-center justify-center gap-10 border-b-[1px] border-b-[#555]'>
          <a href="https://discord.gg/ejRSwc9BnK" target="_blank">Discord</a>
          <a href="https://twitter.com/arasemr1234" target="_blank">Twitter</a>
          <a>Discord</a>
          <a>Discord</a>
      </div>
      <nav class='w-full flex flex-col bg-[#1b1b1b] px-12'>
          <div class='w-full flex flex-row items-center justify-between border-b-[1px] border-b-[#242424]'>
              <router-link to='/' activeClass='0'>
                  <img src="/hole.png" width="150" height="26" alt="" />
              </router-link>
              <div class='flex items-center justify-center'>
                  <input placeholder='Search HoleHub' type="text" />
              </div>
              <div v-if="state.auth.loggedIn" class='flex flex-row items-center gap-3'>
                  <router-link to='/'>{{state.auth.user.username}}</router-link>
                  <a class="cursor-pointer" @click="logout">Logout</a>
                  <router-link to='/upload'>Upload video</router-link>
              </div>
              <div v-else class='flex flex-row items-center gap-3'>
                  <router-link to='/log-in'>Log In</router-link>
                  <router-link to='/sign-up'>Sign Up</router-link>
              </div>
          </div>
          <div class='flex flex-row items-center'>
            <router-link exactActiveClass="active" class="w-1/4 text-center py-2" to='/'>Home</router-link>
            <router-link exactActiveClass="active" class="w-1/4 text-center py-2" to='/videos'>Hole Videos</router-link>
            <router-link exactActiveClass="active" class="w-1/4 text-center py-2" to='/stars'>Hole Stars</router-link>
            <a class="w-1/4 text-center py-2" href="https://discord.gg/ejRSwc9BnK" target="_blank">Community</a>
          </div>
      </nav>
    </div>
    <i class="fa-solid fa-bars z-50 fixed top-0 left-0 fa-2x ml-2 mt-2 lg:hidden" @click="navIsOpen = !navIsOpen"></i>
    <div :class="`lg:hidden flex flex-col items-center justify-center gap-3 fixed top-0 left-0 overflow-auto z-40 bg-black/30 w-full h-full duration-300 ${navIsOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`">
      <router-link exactActiveClass="0" class="text-center" to='/'>Home</router-link>
      <router-link exactActiveClass="0" class="text-center" to='/videos'>Hole Videos</router-link>
      <router-link exactActiveClass="0" class="text-center" to='/stars'>Hole Stars</router-link>
      <span class="hr"></span>
      <div v-if="state.auth.loggedIn" class="flex flex-col items-center w-full gap-3">
        <router-link to='/'>{{state.auth.user.username}}</router-link>
        <a @click="logout">Logout</a>
        <router-link to='/upload'>Upload video</router-link>
      </div>
      <div v-else class="flex flex-col items-center w-full gap-3">
        <router-link to='/log-in'>Log In</router-link>
        <router-link to='/sign-up'>Sign Up</router-link>
      </div>
    </div>
    <div class="w-full h-full flex items-center justify-center" v-if="loading">
      <Loading/>
    </div>
    <router-view v-else></router-view>
  </div>
</template>
