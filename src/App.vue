
<template>
<div style="height: 95%; width: 99%; position: absolute;">
    <el-button type="primary" @click="popLoginPage">登入</el-button>
    <div class="view-box">
        <RouterView></RouterView>
    </div>
</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

async function popLoginPage() {
  router.push({path:"/login"});
}
</script>

<style scoped>
.view-box {
  height: 100%;
  width: 100%;
}
</style>