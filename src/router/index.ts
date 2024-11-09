import { createRouter, createWebHistory } from "vue-router";

import MainPage from "@/page/MainPage.vue";
import PersonalPage from "@/page/PersonalPage.vue";
import LoginPage from "@/page/LoginPage.vue";


const router = createRouter({
history:createWebHistory(),
routes:[
    {
        path:"/",
        redirect:"/main"
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
    },
    {
        name:"personal-page",
        path:"/personal",
        component:PersonalPage
    }
]})

export default router;