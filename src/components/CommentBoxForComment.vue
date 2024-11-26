<script lang="ts">
import UserPreviewIdentityCard from './UserPreviewIdentityCard.vue';
export default {
    name:'CommentBoxForComment',
    components:{
      UserPreviewIdentityCard
    }
  }
</script>

<template>
  <div class="replyList" v-if="!isLoading">
    <li class="reply-box" v-for="(commentItem,index) in relyListForComment" :key="index">
      <div class="reply">
        <div class="avatar-container" 
          @mouseenter="userInfoCardEnter(index)" 
          @mouseleave="userInfoCardDelayLeave(index)"
        >
          <transition name="user-identity-card-content">
            <div class="identity-card-container" v-if="showUserIdentityCard[index]">
              <UserPreviewIdentityCard :theUid="commentItem.uid"/>
            </div>
          </transition>
          <el-avatar :src="commentItem.avatarURL" fit="cover" class="author-avatar"/>
        </div>

        <div class="reply-content">
          <el-text class="reply-user">
            {{ commentItem.nickname }}{{ commentItem.callId === -1 ? ': ' : ' ' }}
          </el-text>
          <el-text class="rely-text">
            {{ commentItem.content }}
          </el-text>
        </div>
      </div>

      <div class="reply-box-bottom">
        <el-text class="reply-time">
          {{ commentItem.replyTime }}
        </el-text>
        <el-button 
          text 
          type="primary" 
          class="reply-button" 
          @click="replyTheUser(commentItem.uid, commentItem.id, commentItem.nickname)"
        >
          回复
        </el-button>
      </div>
    </li>
    
    <div class="reply-make-box">
      <el-input 
        v-model="comment" 
        :placeholder="placeholder" 
        :autosize="{ minRows: 2, maxRows: 3 }" 
        maxlength="100"
        show-word-limit 
        type="textarea" 
        class="content-input" 
      />
      <el-button class="send" type="primary" @click="uploadReply">
        发送
      </el-button>
    </div>
  </div>
  
</template>


<script lang="ts" setup>
import {defineProps, onBeforeMount} from 'vue';
import { useHttpStore } from '@/store/Http';
import Cookies from 'js-cookie';
import {ref,reactive} from 'vue';
import { replyListForComment } from '@/types';
import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';

const props = defineProps(["commentId"]);
const {ip_port} = useHttpStore();
let relyListForComment = reactive<replyListForComment>([]);
const isLoading = ref(true);
const placeholder = ref('也来说说什么吧!');
const comment = ref('');

const showUserIdentityCard = reactive<Array<boolean>>([]);
var timeId: any[] = [];
function userInfoCardEnter(id: number) {
  if (timeId[id] !== undefined) {
    clearTimeout(timeId[id]);
  } else {
    showUserIdentityCard[id] = true;
  }
}
function userInfoCardDelayLeave(id: number) {
  timeId[id] = setTimeout(()=>{
    showUserIdentityCard[id] = false;
    timeId[id] = undefined;
  },100)
}

var isReplyingUid = -1;
var callId = -1;
function replyTheUser(uid: number,commentId: number, nickname: string) {
  if (isReplyingUid === uid) {
    isReplyingUid = -1;
    callId = -1;
    placeholder.value = '也来说说什么吧!';
  } else {
    isReplyingUid = uid;
    callId = commentId;
    placeholder.value = `回复 ${nickname}:`;
  }
}

function uploadReply() {
  if (isReplyingUid === -1) {
    axios({
      method:"post",
      url:ip_port+"/reply/comment",
      data:{
        commentId:props.commentId,
        content:comment.value,
      },
      headers:{
        "Authorization": Cookies.get("Authorization"),
        "uid": Cookies.get("uid")
      },
    })
    .then(function(response){
      const data = response.data;
      if(data.code==200){
        ElMessage({message:"发布成功",type:"success"});
        comment.value = '';
        placeholder.value = '也来说说什么吧!';
        loadReplies();
      }else{
        ElMessageBox.alert(data.message, "", {confirmButtonText: 'OK'});
      }
    })
    .catch(function(error){
      console.log(error);
    });
  } else {
    axios({
      method:"post",
      url:ip_port+"/reply/reply",
      data:{
        commentId:props.commentId,
        content:comment.value,
        callId:callId
      },
      headers:{
        "Authorization": Cookies.get("Authorization"),
        "uid": Cookies.get("uid")
      },
    })
    .then(function(response){
      const data = response.data;
      if(data.code==200){
        ElMessage({message:"发布成功",type:"success"});
        comment.value = '';
        callId = -1;
        isReplyingUid = -1;
        placeholder.value = '也来说说什么吧!';
        loadReplies();
      }else{
        ElMessageBox.alert(data.message, "", {confirmButtonText: 'OK'});
      }
    })
    .catch(function(error){
      console.log(error);
    });
  }
}

async function loadReplies() {
  isLoading.value = true;
  await axios({
  method:"get",
  url:ip_port+`/reply/get?commentId=${props.commentId}`,
  headers:{
    "Authorization": Cookies.get("Authorization"),
    "uid": Cookies.get("uid")
  },
  })
  .then(function(response){
    const data = response.data;
    if (data.code == 200) {
      relyListForComment=data.data;
    } else {
      console.log(data.message);
    }
  })
  .catch(function(error){
      console.log(error);
  })
  .finally(() => {
    isLoading.value = false;
  })
}

onBeforeMount(() => {
  loadReplies();
})

</script>


<style scoped>
.reply-box {
  display: flex;
  flex-direction: column;
  min-height: 65px;
}

.reply{
  display: flex;
  flex-direction: row;
  justify-content: baseline;
}

.avatar-container {
  width: 30px;
  height: 30px;
}
.avatar-container:hover .author-avatar {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
  transition: all 0.1s ease-in-out;
}
.author-avatar {
  cursor: pointer;
  width: 30px;
  height: 30px;
  transition: all 0.2s ease-in-out;
}
.identity-card-container {
  position: absolute;
  margin-left: -355px;
  margin-top: -55px;
}

.reply-content {
  margin-left: 10px;
}

.reply-user {
  font-size: 16px;
  color: #000;
}

.rely-text {
  color: #484848;
  font-size: 15px;
}

.reply-box-bottom {
  margin: auto;
  margin-right: 0;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: end;
}

.reply-button {
  height: 20px;
  width: 40px;
}

.reply-make-box {
  display: flex;
  flex-direction: column;
}

.content-input {
  margin-top: 10px;
}

.send {
  align-self: flex-end;
  margin-top: 5px;
  height: 20px;
  width: 40px;
}




/* 发帖者身份卡片动画 */
.user-identity-card-content-enter-active  {
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}
.user-identity-card-content-leave-active {
  transition: opacity 0.3s ease-out, transform 0.2s ease-out;
}
.user-identity-card-content-enter-from,
.user-identity-card-content-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>