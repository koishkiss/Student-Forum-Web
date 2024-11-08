import { createRouter, createWebHistory } from "vue-router";

import App from "@/App.vue";
import LoginPage from "@/page/LoginPage.vue";
import MainPage from "@/page/MainPage.vue";


const router = createRouter({
history:createWebHistory(),
routes:[
    {
        name:"app-page",
        path:"/",
        component:App
    },
    {
        name:"login-page",
        path:"/login",
        component:LoginPage
    },
    {
        name:"main-page",
        path:"/main",
        component:MainPage
    }
]})

export default router;