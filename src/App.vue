
<template>
<div style="height: 95%; width: 99%; position: absolute;">
  <NavBar/>

  <div class="view-box">
    <RouterView></RouterView>
  </div>
</div>
</template>


<script setup lang="ts">
import NavBar from './components/NavBar.vue';

</script>


<style scoped>
.view-box {
  margin-top: 37px;
  padding-top: 10px;
  height: 100%;
  width: 100%;
}
</style>