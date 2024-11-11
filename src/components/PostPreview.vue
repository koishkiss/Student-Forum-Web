<script lang="ts">
  export default {
    name:'PostPreview',  //组件名
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

    <div class="post-data-box">
      <el-text>{{ postTime }}</el-text>
      <el-text>{{ status }}</el-text>
      <el-text>{{ viewNum }}</el-text>
    </div>
  </div>

  <div class="post-content-box">
    <title class="post-title">
      {{ title }}
    </title>

    <el-text class="post-preview-text">
      {{ content }}
    </el-text>

    <el-image :src="coverURL" fit="cover" class="post-cover"/>
  </div>

  <div class="post-data-num-box"> 
    <el-text>{{ commentNum }}</el-text>
    <el-text>{{ likeNum }}</el-text>
    <el-text>{{ bookmarkNum }}</el-text>
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

.post-data-box {
  display: flex;
  margin: auto;
  margin-right: 10px;
}


</style>