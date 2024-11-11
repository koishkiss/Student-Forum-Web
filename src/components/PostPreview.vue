<script lang="ts">
import { View,ChatLineSquare } from "@element-plus/icons-vue"
export default {
  name:'PostPreview',  //组件名
  components:{
    View,ChatLineSquare
  }
}
</script>

<template>
<div class="post-preview-box">
  <div class="preview-head-box">
    <div class="author-box">
      <el-avatar :src="avatarURL" fit="cover" class="author-avatar"/>
      <el-divider direction="vertical" class="divider-between-name-avatar" />
      <el-text class="author-name">
        {{ nickname }}
      </el-text>
    </div>

    <el-text class="view-num">
      <el-icon><View /></el-icon>
      <span>{{ viewNum }}</span>
    </el-text>
  </div>

  <div class="post-content-box">
    <el-text class="post-title">
      <el-tag type="warning" v-if="status === 1">精华</el-tag>
      <span class="title">{{ title }}</span>
    </el-text>

    <el-text class="post-preview-text" tag="p">
      {{ content }}
    </el-text>

    <div class="post-cover-box">
      <el-image 
        :src="coverURL" 
        fit="cover" 
        class="post-cover" 
        lazy 
        :preview-src-list="[coverURL]" 
        :initial-index="0"
      />
    </div>
  </div>

  <el-divider style="margin:5px 0;" />

  <div class="post-data-box"> 
    <div class="post-data-num-box">
      <el-text class="data-num-item">
        <el-icon><ChatLineSquare /></el-icon>
        <span>{{ commentNum }}</span>
      </el-text>
      <el-text class="data-num-item">
        <el-icon><ChatLineSquare /></el-icon>
        <span>{{ likeNum }}</span>
      </el-text>
      <el-text class="data-num-item">
        <el-icon><ChatLineSquare /></el-icon>
        <span>{{ bookmarkNum }}</span>
      </el-text>
    </div>
    <el-text class="post-time">发布于 {{ postTime }}</el-text>
  </div>
</div>
</template>


<script lang="ts" setup>

defineProps([
  "id",
  "sectionId",
  "title",
  "content",
  "coverURL",
  "postTime",
  "like_time",
  "commentNum",
  "viewNum",
  "likeNum",
  "bookmarkNum",
  "uid",
  "nickname",
  "avatarURL",
  "status"
])

</script>


<style scoped>
.post-preview-box {
  display: flex;
  flex-direction: column;
}

.preview-head-box {
  display: flex;
  flex-direction: row;
}

.author-box {
  display: flex;
  flex-direction: row;
  align-self: flex-start;
}

.author-avatar {
  width: 30px;
  height: 30px;
}
.divider-between-name-avatar {
  top: 0;
  bottom: 0;
  margin: auto;
  margin-left: 6px;
  margin-right: 6px;
  height: 22px;
}
.author-name {
  font-size: 16px;
}

.view-num {
  display: flex;
  margin: auto;
  margin-right: 10px;
  flex-direction: row;
  align-items: center;
  justify-items: start;
  font-size: 14px;
}
.view-num span {
  margin-left: 3px;
}

.post-content-box {
  margin-top: 10px;
}

.post-title {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.post-title .title {
  margin-left: 5px;
  font-size: 20px;
  font-weight: bold;
  color: #000;
}

.post-preview-text {
  margin-top: 5px;
}

.post-cover-box {
  max-height: 400px;
  margin-top: 5px;
  display: flex;
}
.post-cover {
  width: 100%;
}

.post-data-box {
  display: flex;
  flex-direction: row;
  justify-items: center;
}

.post-data-num-box {
  display: flex;
  flex-direction: row;
}

.data-num-item {
  display: flex;
  margin-left: 40px;
  margin-right: 30px;
  flex-direction: row;
  align-items: center;
  justify-items: start;
  font-size: 14px;
}
.data-num-item span {
  margin-left: 3px;
}

.post-time {
  margin: auto;
  margin-right: 8px;
  font-size: 12px;
  color: #747474;
}

</style>