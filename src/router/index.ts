import { createRouter, createWebHistory } from "vue-router";

import MainPage from "@/page/MainPage.vue";
import PersonalPage from "@/page/PersonalPage.vue";
import LoginPage from "@/page/LoginPage.vue";
import PostPage from "@/page/PostPage.vue";
import SectionPage from "@/page/SectionPage.vue";
import SearchPage from "@/page/SearchPage.vue";

import PersonalPageForVisitor from "@/page/PersonalPageForVisitor.vue";
import RecordPageForVisitor from "@/components/RecordPageForVisitor.vue";
import CollectionPageForVisitor from "@/components/CollectionPageForVisitor.vue";
import Activities from "../page/personal/ActivityPage.vue"
import Collections from "../page/personal/CollectionPage.vue"
import Person from "../page/personal/RecordPage.vue"
import Settings from "../page/personal/SettingPage.vue"

import PostListPage from "@/page/section/PostListPage.vue";
import PostSelectedListPage from "@/page/section/PostSelectedListPage.vue";
import MyOwnPostPage from "@/page/personal/record/MyOwnPostPage.vue"
import MyLikedPostPage from "@/page/personal/record/MyLikedPostPage.vue"
import MyViewedPostPage from "@/page/personal/record/MyViewedPostPage.vue"

import MessagePage from "@/page/MessagePage.vue";
import MyReplyPage from "@/page/message/MyReplyPage.vue";
import MyNoticePage from "@/page/message/MyNoticePage.vue";
import MyLikePage from "@/page/message/MyLikePage.vue";
import SectionSettingPage from "@/page/section/SectionSettingPage.vue";

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
        path:"/post",
        component:PostPage
    },
    {
        name:"visit-other-personal-page",
        path:"/visit/other/person/:uid",
        component:PersonalPageForVisitor,
        children:[
            {
                path:"post",
                component:RecordPageForVisitor
            },
            {
                path:"marked",
                component:CollectionPageForVisitor
            }
        ]
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
                        path:"mine",
                        component:MyOwnPostPage
                    },
                    {
                        path:"liked",
                        component:MyLikedPostPage
                    },
                    {
                        path:"viewed",
                        component:MyViewedPostPage
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
            },
            {
                path:"setting",
                component:SectionSettingPage
            }
        ]
    },
    {
        name:"message-box",
        path:"/message",
        component:MessagePage,
        children:[
            {
                path:"like",
                component:MyLikePage
            },
            {
                path:"reply",
                component:MyReplyPage
            },
            {
                path:"notice",
                component:MyNoticePage
            }
        ]
    },
    {
        name:"search-page",
        path:"/search",
        component:SearchPage
    }
]})

export default router;