<script lang="ts">
    export default {
        name:"CommentBox",
    }
</script>

<template>
<div class="comment-box-box">
    <el-text tag="p" class="box-title"> 
        发表评论 
    </el-text>

    <div class="input-box">
        <el-input 
            v-model="comment" 
            placeholder="留下你的想法吧!" 
            :autosize="{ minRows: 8, maxRows: 11 }" 
            maxlength="500"
            show-word-limit 
            type="textarea" 
            class="content-input" 
        />
        <el-button class="send" type="primary" plain @click="uploadComment">
            发送
        </el-button>
    </div> 
</div>
</template>



<script lang="ts" setup>
import axios from 'axios';
import { ref } from 'vue';
import { defineProps } from 'vue';
import { useHttpStore } from '@/store/Http';
import { ElMessage, ElMessageBox } from 'element-plus';
import Cookies from 'js-cookie';
const comment = ref("");
const props = defineProps(["postId"]);
const { ip_port } = useHttpStore();

function uploadComment() {
    axios({
        method:"post",
        url:ip_port + "/comment/make",
        data:{
            "postId":props.postId,
            "content":comment.value
        },
        headers: {
            "Authorization": Cookies.get("Authorization"),
            "uid": Cookies.get("uid")
        },
    })
    .then(function (response) {
        const data = response.data;
        if (data.code == 200) {

            ElMessage({message:"发布成功",type:"success"});
        } else {
            ElMessageBox.alert(data.message, "", {confirmButtonText: 'OK'});
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}
</script>



<style scoped>
.box-title {
    font-size: 25px;
    font-weight: bold;
}

.input-box {
    display: flex;
    flex-direction: column;
}

.content-input {
    margin-top: 10px;
}

.send {
    align-self: flex-end;
    margin-top: 10px;
}
</style>