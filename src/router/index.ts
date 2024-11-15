import { createRouter, createWebHistory } from "vue-router";

import MainPage from "@/page/MainPage.vue";
import PersonalPage from "@/page/PersonalPage.vue";
import LoginPage from "@/page/LoginPage.vue";

import Activities from "../components/ActivitiesInPersonalPage.vue"
import Collections from "../components/CollectionsInPersonalPage.vue"
import Person from "../components/PersonInPersonalPage.vue"
import Settings from "../components/SettingsInPersonalPage.vue"
import postPage from "@/components/postPage.vue";
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
        name:"post-detail-page",
        path:"/postPage",
        component:postPage
    },
    {
        name:"personal-page",
        path:"/personal",
        component:PersonalPage,
        children:[
            {
                path:"Activities",
                component:Activities,
            },
            {
                path:"Collections",
                component:Collections,
            },
            {
                path:"Person",
                component:Person,
            },
            {
                path:"Settings",
                component:Settings,
            },

        ]
    }
]})

export default router;