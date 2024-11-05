<template>
    <div class="profile-sidebar">
        <div class="profile">
            <div class="avatar">头像</div>
            <div>    
                <div class="user-info">
                    <span class="inline-block">昵称：{{ name }}</span>
                    <span class="inline-block">UID：{{ uid }}</span>
                    <span>发帖数：{{ postCount }}</span>
                </div>
                <p>个性签名：{{ signature }}</p>
            </div>
        </div>
        <nav class="nav-tabs">
            <a href="#">动态</a>
            <a href="#">收藏</a>
            <a href="#">个人</a>
            <a href="#">设置</a>
        </nav>
    </div>
  </template>
  
<script lang="ts" setup>
    import { ref } from 'vue' 
    //这里调用/user/mine/info，将用户信息传入name,uid,postCount,signature
    const name = ref('张三')
    const uid = ref('123456')
    const postCount = ref(42)
    const signature = ref('个性签名')
    
</script>
  
<style scoped>
    .profile-sidebar {
        flex: 7; /* 70% 宽度 */
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
  
    .profile {
        display: flex;
        align-items: center; /* 垂直居中对齐 */
        gap: 5%;
        padding: 10px;
        margin: 0 auto;
    }

    .avatar {
        width: 100px; /* 固定头像宽度 */
        height: 100px; /* 固定头像高度 */
        background-color: #ccc;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #fff;
        border-radius: 50%; /* 将头像设置为圆形 */
        margin-right: 5%; /* 头像和用户信息之间的水平间距 */
    }

    .user-info {
        display: flex;
        flex-direction: row;
        gap: 5px;
    }
    .inline-block {
        display: inline-block;
        border-right: 1px solid #ccc;
        padding-right: 10px;
        margin-right: 10px;
        gap: 10px;
    }

    h3, h4, p {
        margin: 0;
    }
  
    .nav-tabs {
        display: flex;
        justify-content: space-around;
        margin-top: 20px;
    }
  
    .nav-tabs a {
        color: #337ab7;
        text-decoration: none;
        font-size: 14px;
    }
</style>
  