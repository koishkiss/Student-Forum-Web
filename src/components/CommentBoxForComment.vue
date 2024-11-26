<script lang="ts">
import { useHttpStore } from '@/store/Http';
import axios from 'axios';
export default {
    name:'CommentBoxForComment',
    components:{

    }
  }
</script>
<template>
  <div class="replyList" v-if="!isLoading">
    <li class="reply-box" v-for="commentItem in relyListForComment" :key="commentItem.id">
    <div class="reply">
      <el-avatar :src="commentItem.avatarURL" class="rely-avatar"/>
      <div class="reply-content">
        <span class="reply-user">{{ commentItem.nickname }}</span>
        <span class="rely-text">{{ commentItem.content }}</span>
      </div>
    </div>
    <div class="reply-time">2024-11-17</div>
  </li>
  </div>
  
</template>
<script lang="ts" setup>
import {defineProps} from 'vue';
import Cookies from 'js-cookie';
import {ref,reactive} from 'vue';
import { replyListForComment } from '@/types';
const {ip_port} = useHttpStore();
let relyListForComment = reactive<replyListForComment>([]);
const props = defineProps(["commentId"]);
let isLoading = ref(true);
axios({
  method:"get",
  url:ip_port+`/reply/get?commentId=${props.commentId}`,
  
  headers:{
      "Authorization": Cookies.get("Authorization"),
      "uid": Cookies.get("uid")
    },
})
.then(function(response){
  const data = response.data;
  if(data.code == 200){
    console.log("hhh")
    relyListForComment=data.data;
    isLoading.value = false;
  }else{
    console.log(data.message);
  }
})
.catch(function(error){
    console.log(error);
})
</script>
<style scoped>
.reply{
  display: flex;
  
}
</style>