<script lang="ts">
export default {
  name: "MyNoticePage",
};
</script>

<template>
  <div class="my-notice-page-box">
    <el-text class="box-title" tag="p">
      通知中心
    </el-text>
    <div class="my-notice-list-box">
      <ul class="notice-list">
        <li v-for="(notice, index) in noticeList" :key="index" class="notice-item">
          <div class="notice-item-box">
            <el-text tag="p" class="notice-content">{{ notice }}</el-text>
          </div>
          <el-divider style="margin-top: 10px; margin-bottom: 10px;" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";

const noticeList = reactive([
  "正在直播S14总决赛：BLG vs T1！BLG战队首度闯入S赛总决赛舞台，时隔11年，全华班再次与T1在决赛舞台相遇，谁将加冕为王？11月2日22点，上6号直播间看S14总决赛，天选好礼送不停，高能观赛团更是惊喜不断，25万现金红包等你来抽！",
  "BML2024精彩再来亿遍，进度自由把控！Ave Mujica、CHiCO、SPYAIR、樋口爱、神山羊、Liyuu、洛天依等多组重磅嘉宾演出精选回放已上线～带来仿佛置身于现场的聆听感受。",
]);
</script>

<style scoped>
.box-title {
  position: sticky;
  top: 57px;
  background-color: #fff;
  z-index: 1;
  color: #343434;
  font-size: 30px;
  font-weight: bold;
}

.my-notice-list-box {
  margin-top: 10px;
}

.notice-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.notice-item {
  background-color: #fff;
  padding: 5px;
}

.notice-item-box {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-left: 10px;
}

.notice-content {
  color: #141414;
  font-size: 16px;
}
</style>
