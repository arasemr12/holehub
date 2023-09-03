import axios from "axios";
import { useStore } from "vuex";

const base = import.meta.env.VITE_BASE_URL;

const initAxios = (token) => {
    axios.defaults.baseURL = base;
    
    axios.defaults.headers = {
        'Content-Type':'application/json',
        'authorization':token
    };
};

export {initAxios};

export default axios;
