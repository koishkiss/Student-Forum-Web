import { defineStore } from "pinia";

export const useHttpStore = defineStore("HttpStore",{
    state() {
        return {
            ip_port:"http://47.113.194.64:22222/api",
            // ip_port:"http://202.194.7.29:22222/api",
            // ip_port:"http://127.0.0.1:22222/api",
            static_ip_port:"http://47.113.194.64:22222"
            // ip_port:"http://202.194.7.29:22222"
        }
    }
})