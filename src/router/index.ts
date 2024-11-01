import { createRouter, createWebHistory } from "vue-router";

import App from "@/App.vue";
import Login from "@/page/LoginPage.vue";


const router = createRouter({
history:createWebHistory(),
routes:[
    {
        name:"login-page",
        path:"/login",
        component:Login
    },
    {
        name:"app-page",
        path:"/",
        component:App
    }
]})

export default router;