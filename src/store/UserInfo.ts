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
            registerTime:"",
            likeNum:-1,
            bookmarkNum:-1,
            postNum:-1,
            joinNum:-1,
            avatarURL:"http://47.113.194.64:22222/image/default-avatar.png"
        }
    },
    getters: {
        auth(user) {
            if (user.authority === 0) {
                return { type: 'danger', label: '封禁中' }
            } else if (user.authority === 1) {
                return { type: 'primary', label: 'SDUer' }
            } else if (user.authority === 2) {
                return { type: 'success', label: '小版主' }
            } else {
                return { type: 'warning', label: '总版主' }
            }
        }
    }
})