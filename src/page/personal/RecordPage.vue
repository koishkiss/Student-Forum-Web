<script lang="ts">
import { ArrowDown } from '@element-plus/icons-vue';
export default {
  name:"RecordPage",
  components:{
    ArrowDown
  }
}
</script>

<template>
<div class="record-page-box">
  <nav class="nav-tabs">
    
    <el-dropdown placement="bottom">
      <span class="el-dropdown-link">
        切换
        <el-icon class="el-icon--right">
          <ArrowDown />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu class="drop-list">
          <RouterLink to="/personal/post/mine" class="router" active-class="router-link-active">
            <div class="router-box">
              <span>我的帖子</span>
            </div>
          </RouterLink>

          <RouterLink to="/personal/post/liked" class="router" active-class="router-link-active">
            <div class="router-box">
              <span>我的点赞</span>
            </div>
          </RouterLink>

          <RouterLink to="/personal/post/viewed" class="router" active-class="router-link-active">
            <div class="router-box">
              <span>浏览历史</span>
            </div>
          </RouterLink>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

  </nav>
  <RouterView />
</div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';


const router = useRouter();

router.push("/personal/post/mine")

</script>


<style scoped>

.record-page-box {
  position: relative;
}

.nav-tabs {
  top: 10px;
  right: 30px;
  position: absolute;
}

.el-dropdown-link {
  font-size: 18px;
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

.drop-list {
  padding: 0;
  width: 120px;
  display: flex;
  flex-direction: column;
  margin-top: 1px;
  margin-bottom: 1px;
}

.router {
  font-size: 20px;
  text-decoration: none;
  font-weight: bold;
  text-shadow: .5px .5px 1px grey;
  color: #000;
  transition: all 0.2s;
}
.router-box {
  background-color: #ffffff;
  height: 45px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.2s;
}
.router-box:hover {
  background-color: #dadada;
  transition: all 0.2s;
}
.router-link-active .router-box {
  color: #fa541c;
  text-shadow: none;
  transition: all 0.2s;
}

</style>