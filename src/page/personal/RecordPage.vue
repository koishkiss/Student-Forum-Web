<script lang="ts">
export default {
  name:"RecordPage"
}
</script>

<template>
<div class="left-side">
  <nav class="nav-tabs">

    <RouterLink to="/personal/post/mine" class="router cta" active-class="router-link-active">
      <span class="hover-underline-animation"> 我的帖子 </span>
    </RouterLink>

    <RouterLink to="/personal/post/liked" class="router cta" active-class="router-link-active">
      <span class="hover-underline-animation"> 我的点赞 </span>
    </RouterLink>

    <RouterLink to="/personal/post/viewed" class="router cta" active-class="router-link-active">
      <span class="hover-underline-animation"> 浏览历史 </span>
    </RouterLink>

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
.nav-tabs {
display: flex;
justify-content: space-around;
border-bottom: 2px solid #eee;
}

.router {
text-decoration: none;
font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
text-shadow: 1px 1px 2px grey;
margin-bottom: 10px;
}

.router-link-active span {
color: #041500;
}

.router-link-active .hover-underline-animation::after {
transform: scaleX(1);
transform-origin: bottom left;
}
</style>