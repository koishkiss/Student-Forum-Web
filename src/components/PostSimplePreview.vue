<script lang="ts">
export default {
  name:'PostSimplePreview',  //组件名
}
</script>
<template>
    <div class="post-thumbnail">
                <!-- 封面图片 -->
                <el-image 
                    :src="coverURL || 'https://via.placeholder.com/150'"
                    fit="cover"
                    class="cover-img"
                    alt="封面图片"
                />
            </div>
            <div class="post-content">
                <!-- 标题和信息 -->
                <h3 class="post-title">{{ title }}</h3>
                <p class="post-description">{{ content }}</p>
                <div class="post-info">
                    <span>👍 {{ likeNum }}</span>
                    <span>💬 {{ commentNum }}</span>
                    <span>👁️ {{ viewNum }}</span>
                </div>
            </div>
</template>

<script lang="ts" setup name="PostSimplePreview">
import { useHttpStore } from "@/store/Http";
import Cookies from "js-cookie";
import { onBeforeMount, ref } from "vue";
import axios from "axios";
import { ElMessage,ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";

let props = defineProps([
  "id",
  "sectionId",
  "title",
  "content",
  "coverURL",
  "postTime",
  "like_time",
  "mark_time",
  "commentNum",
  "viewNum",
  "likeNum",
  "bookmarkNum",
  "uid",
  "nickname",
  "avatarURL",
  "status"
])
console.log("32424")

</script>
<style scoped>
    .post-thumbnail {
        flex: 0 0 120px;
        width: 120px;
        height: 80px;
        margin-right: 15px;
    }
    .cover-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 8px;
    }
    .post-content {
        flex: 1;
    }
    .post-title {
        font-size: 16px;
        margin: 0 0 5px;
        color: #333;
    }

    .post-description {
        font-size: 14px;
        color: #666;
        margin-bottom: 10px;
    }

    .post-info {
        display: flex;
        gap: 10px;
        font-size: 13px;
        color: #999;
    }
</style>