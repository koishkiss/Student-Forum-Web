<template>
    <div class="left-side">
      <nav class="nav-tabs">

        <RouterLink to="/personal/post/my-post" class="router cta" active-class="router-choose">
          <span class="hover-underline-animation"> 我的帖子 </span>
        </RouterLink>

        <RouterLink to="/personal/post/view-history" class="router cta" active-class="router-choose">
          <span class="hover-underline-animation"> 浏览历史 </span>
        </RouterLink>

        <RouterLink to="/personal/post/my-like-post" class="router cta" active-class="router-choose">
          <span class="hover-underline-animation"> 我的点赞 </span>
        </RouterLink>

      </nav>
      <RouterView />
    </div>
</template>
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
    .router-choose span {
    color: #0d4700;
    }
    .router-choose .hover-underline-animation::after {
    transform: scaleX(1);
    transform-origin: bottom left;
    }
</style>