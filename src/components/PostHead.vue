<script lang="ts">
export default {
  name:'PostHead'
}
</script>

<template>
<div class="post-head">
  <div class="cover-icon-box">
    <el-image 
      :src="iconURL" 
      fit="cover" 
      class="avatar"
      @click="toTheSection"
    />
  </div>

  <div class="other-info">
    <el-text 
      tag="span" 
      class="section-name" 
      @click="toTheSection"
    >
      {{ name }}
    </el-text>
    <div>
      <el-text class="info-item">关注：{{ memberNum }}</el-text>
      <el-divider direction="vertical" />
      <el-text class="info-item">帖子：{{ postNum }}</el-text>
      <el-divider direction="vertical" />
      <el-text class="info-item">分区：{{ classify }}</el-text>
      <el-divider direction="vertical" />
      <el-text class="info-item">创建时间：{{ createTime }}</el-text>
    </div>
  </div>
</div>
</template>


<script lang="ts" setup>
import { useRouter } from 'vue-router';


const props = defineProps(["sectionId","iconURL","name","memberNum","postNum","classify","createTime","slogan"]);

const router = useRouter();

function toTheSection() {
  router.push(`/section/${props.sectionId}`);
}

</script>


<style scoped>
.post-head {
  border: solid 1px rgb(211, 211, 211);
  display: flex;
  flex-direction: row;
  padding: 5px;
  height: 100px;
  background-color: #f0f0f0;
}

.cover-icon-box {
  width: 125px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.avatar {
  width: 75px;
  height: 75px;
  border: 2px double #a1a1a1;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;
}
.avatar:hover {
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
  transition: all 0.2s ease-in-out;
}

.other-info {
  display: flex;
  align-items: center;
}
.section-name {
  color: #000;
  font-size: 23px;
  font-weight: bold;
  margin-right: 20px;
  cursor: pointer;
}
.tag {
  height: 20px;
  width: 40px;
  justify-self: center;
  align-self: center;
  margin-left: 7px;
}
.slogan {
  margin-top: 6px;
}
</style>
