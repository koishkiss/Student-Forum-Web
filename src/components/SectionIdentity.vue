<script lang="ts">
  import { Menu,Avatar,Promotion } from '@element-plus/icons-vue';
  export default {
    name:'SectionIdentity',  //组件名
    components: {
      Menu,Avatar,Promotion
    }
  }
</script>

<template>
<div class="section-identity-box">
  <div class="cover-title">
    <div class="cover-wrap">
      <el-image :src="iconURL" fit="cover" lazy class="cover"/>
    </div>
    <a class="liner-text1">
      {{ name }}
    </a>
  </div>

  <div class="section-describe" v-if="classifyName!==undefined">
    <span class="classify" title="分区">
      <el-icon size="10"><Menu/></el-icon> {{ classifyName }}
    </span>
    <span class="member" title="关注数">
      <el-icon size="10"><Avatar/></el-icon> {{ memberNum }}
    </span>
    <span class="post" title="总帖数">
      <el-icon size="10"><Promotion/></el-icon> {{ postNum }}
    </span>
  </div>
</div>
</template>


<script lang="ts" setup>

defineProps(["sectionId","iconURL","name","classify","classifyName","memberNum","postNum"]);

</script>


<style scoped>
@import '@/assets/liner-text1.css';

.section-identity-box {
  height: 140px;
  display: flex;
  flex-direction: row;
}

.cover-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  cursor: pointer;
}
.cover-wrap {
  height: 105px;
  width: 105px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.cover {
  height: 100px;
  width: 100px;
  border-radius: 10px;
  box-shadow: 0 4px 4px 0 rgb(60 64 67 / 30%), 0 8px 12px 6px rgb(60 64 67 / 15%);
  transition: height 0.3s ease, width 0.3s ease;
}
.cover:hover {
  height: 104px;
  width: 104px;
  box-shadow: 0 4px 4px 0 rgb(60 64 67 / 30%), 0 8px 12px 6px rgb(60 64 67 / 15%);
  transition: 0.3s ease;
  transition-property: height,box-shadow,width;
}

.liner-text1 {
  font-weight: bolder;
}

.section-describe {
  margin-top: 15px;
  margin-left: 2px;
  display: flex;
  flex-direction: column;
}

.section-describe span {
  font-size: 13px;
  margin-bottom: 10px;
}

</style>