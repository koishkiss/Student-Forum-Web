import { defineStore } from "pinia";

export const useUserInfoStore = defineStore("UserInfo",{
    state() {
        return {
            uid:-1,
            sid:"",
            authority:-1,
            realName:"",
            nickname:"",
            signature:"",
            avatarURL:""
        }
    }
})