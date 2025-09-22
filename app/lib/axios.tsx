import axios from "axios";
import {auth} from "@/app/lib/auth";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_BACKEND_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

axiosInstance.interceptors.request.use(async (config) => {
    const session = await auth();

    if (session?.tokens?.access_token) {
        config.headers.Authorization = `Bearer ${session.tokens.access_token}`;
    }

    return config;
});

axiosInstance.interceptors.response.use(response => response);

export default axiosInstance;