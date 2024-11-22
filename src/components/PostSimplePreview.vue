<script lang="ts">
export default {
  name:'PostSimplePreview',  //组件名
}
</script>

<template>
<div class="post-simple-preview-box">
  <div class="post-content">
    <!-- 标题和信息 -->
    <h3 class="post-title" @click="toThePost">{{ title }}</h3>
    <p class="post-description"  @click="toThePost">{{ content }}</p>
    <div class="post-info">
      <span>👍 {{ likeNum }}</span>
      <span>💬 {{ commentNum }}</span>
      <span>👁️ {{ viewNum }}</span>
    </div>
  </div>
  
  <div class="post-thumbnail" v-if="coverURL"  @click="toThePost">
    <!-- 封面图片 -->
    <el-image 
      :src="coverURL"
      fit="cover"
      class="cover-img"
      alt="封面图片"
    />
  </div>
</div>
</template>


<script lang="ts" setup name="PostSimplePreview">
import { useRouter } from 'vue-router';

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

const router = useRouter();

function toThePost() {
  router.push(`/post?id=${props.id}`);
}

</script>


<style scoped>

.post-simple-preview-box {
  display: flex;
  flex-direction: row;
}

.post-thumbnail {
  align-self: flex-end;
}

.post-content {
  flex: 1;
}

.post-title {
  cursor: pointer;
  font-size: 16px;
  margin: 0 0 5px;
  color: #333;
}

.post-description {
  cursor: pointer;
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

.cover-img {
  cursor: pointer;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  width: 120px;
  height: 80px;
}
</style>