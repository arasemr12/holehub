import { useStore } from "vuex";
import { useRouter } from "vue-router";

const Auth = () => {
    const store = useStore();
    const router = useRouter();
    if(store.state.auth.loggedIn) return router.push("/");
};

export default Auth;
