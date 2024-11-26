<script lang="ts">
import { useHttpStore } from '@/store/Http';
export default {
    name:'PostingBoxForComment',
    components:{

    }
  }
</script>
<template>
  <div class="comment-box">
    <el-text tag="p">评论</el-text>
    <div class="input-box">
      <el-input v-model="comment"
      placehoder="请填写内容"
      type="textarea"
      class="content-input"/>
      <el-button class="send" type="primary" @click="uploadComment">发送</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import axios from 'axios';
import Cookies from 'js-cookie';
import {ref} from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import {defineProps} from 'vue';
const comment = ref("")
const {ip_port} = useHttpStore();
const props = defineProps(["commentId"])
function uploadComment(){
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
    }else{
      ElMessageBox.alert(data.message, "", {confirmButtonText: 'OK'});
    }
  })
  .catch(function(error){
    console.log(error);
  });
}
</script>