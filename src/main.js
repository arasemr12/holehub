import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router';
import { createStore } from 'vuex'

import './index.css';

import Home from "./pages/Home.vue";
import NewVideos from "./pages/NewVideos.vue";
import SignUp from "./pages/SignUp.vue";
import LogIn from "./pages/LogIn.vue";
import Upload from './pages/Upload.vue';
import Video from './pages/Video.vue';
import VideoPlayer from './pages/VideoPlayer.vue';
import Stars from './pages/Stars.vue';
import User from './pages/User.vue';

const routes = [
    {
        path:'/',
        component:Home
    },
    {
      path:'/videos',
      component:NewVideos,
    },
    {
      path:'/stars',
      component:Stars,
    },
    {
        path:'/sign-up',
        component:SignUp,
    },
    {
        path:'/log-in',
        component:LogIn,
    },
    {
        path:'/upload',
        component:Upload,
    },
    {
      path:'/video',
      component:Video,
    },
    {
      path:'/video/:id',
      component:VideoPlayer,
    },
    {
      path:"/user/:id",
      component:User
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const store = createStore({
    state () {
      return {
        auth:{
            loggedIn:false,
            user: null
        },
        token:""
      }
    },
    mutations: {
      setAuth(state,data) {
        state.auth = data;
      },
      setToken(state,data){
        state.token = data;
      }
    }
});

createApp(App).use(router).use(store).mount('#app')
