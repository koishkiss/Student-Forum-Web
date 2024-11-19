import { createRouter, createWebHistory } from "vue-router";

import MainPage from "@/page/MainPage.vue";
import PersonalPage from "@/page/PersonalPage.vue";
import LoginPage from "@/page/LoginPage.vue";
import postPage from "@/components/postPage.vue"
import SectionPage from "@/page/SectionPage.vue";

import Activities from "../page/personal/ActivitiesInPersonalPage.vue"
import Collections from "../page/personal/CollectionsInPersonalPage.vue"
import Person from "../page/personal/PersonInPersonalPage.vue"
import Settings from "../page/personal/SettingsInPersonalPage.vue"

import PostListPage from "@/page/section/PostListPage.vue";
import PostSelectedListPage from "@/page/section/PostSelectedListPage.vue";
import MyPost from "@/page/personal/personSection/MyPostInPersonalPage.vue"
import MyLikePost from "@/page/personal/personSection/MyLikePostPageInPersonalPage.vue"
import ViewHistory from "@/page/personal/personSection/ViewHistoryInPersonalPage.vue"

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
                path:"activity",
                component:Activities
            },
            {
                path:"post",
                component:Person,
                children:[
                    {
                        path:"my-post",
                        component:MyPost
                    },
                    {
                        path:"my-like-post",
                        component:MyLikePost
                    },
                    {
                        path:"view-history",
                        component:ViewHistory
                    }
                ]
            },
            {
                path:"mark",
                component:Collections
            },
            {
                path:"setting",
                component:Settings
            },

        ]
    },
    {
        name:"section-page",
        path:"/section/:id",
        component:SectionPage,
        children:[
            {
                path:"post/all",
                component:PostListPage
            },
            {
                path:"post/selected",
                component:PostSelectedListPage
            }
        ]
    }
]})

export default router;