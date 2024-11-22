<script lang="ts">
export default {
  components: { CommentBox, postThread },
    name:'postPage',
}
import commentBox from './CommentBox.vue';
</script >


<template>
        <div class="post-list" v-if="!isLoading">
            <li v-for ="commentPost in commentPostList" :key="commentPost.id">
                <postThread v-bind=commentPost />
            </li>
    </div>
    <CommentBox :postId="route.query.id"/>
</template>

<script lang="ts" setup >
import postThread from './postThread.vue';
import {useRoute} from 'vue-router'
import Cookies from 'js-cookie';
import axios from 'axios';
import {reactive,ref} from 'vue';
import { useHttpStore } from '@/store/Http';
import { CommentPostList } from '@/types';
import CommentBox from './CommentBox.vue';
const { ip_port } = useHttpStore();
let route = useRoute();
let isLoading = ref(true);
let commentPostList = reactive<CommentPostList>([])
console.log(route);
console.log(route.query.id);
axios({
    method:"post",
    url:ip_port+"/comment/get",
    params:{
        "postId":route.query.id
    },
    headers:{
        "Authorization":Cookies.get("Authorization"),
        "uid":Cookies.get("uid")
    },
    data:{
        "pagination": 1,
        "pageSize": 2
    }
    
})
.then((response)=> {
    const data = response.data;
    if(data.code === 200) {
        commentPostList = data.data.records;
        console.log("hahha")
        console.log(commentPostList)
        isLoading.value = false;
    }else {
        window.alert(data.message);
    }
})

</script>
<style scoped>

.post-list{
    width: 900px;
    display:flex;
    justify-content: center;
    justify-self: center;
    flex-direction: column;
    background-color: #ffffffa2;
    border-radius: 10px; /* 圆角 */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>

    
