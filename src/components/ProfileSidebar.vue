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
            <RouterLink to="/personal/Activities" active-class="true">动态</RouterLink>
            <RouterLink to="/personal/Collections" active-class="true">收藏</RouterLink>
            <RouterLink to="/personal/Person" active-class="true">个人</RouterLink>
            <RouterLink to="/personal/Settings" active-class="true">设置</RouterLink>
        </nav>
        <RouterView />
    </div>
  </template>
  
<script lang="ts" setup>
    import Cookies from 'js-cookie';
    import { ref, onMounted } from 'vue';
    import axios from 'axios';
    import { useHttpStore } from '@/store/Http';
    
    // 从Cookies中获取授权信息和用户ID
    const Authorization = ref(Cookies.get('Authorization') || '');
    const uidLocal = ref(Cookies.get('uid') || '');
    
    // 使用HttpStore获取IP和端口配置
    const { ip_port } = useHttpStore();
    
    // 定义响应数据的状态
    const loading = ref(false);
    const name = ref('加载中...');
    const uid = ref('');
    const postCount = ref(0); // 发帖数，可以在另一个API请求中获取
    const signature = ref('');
    
    // 在组件挂载时请求用户数据
    onMounted(() => {
        loading.value = true;
        
        // 设置请求头
        const headers = {
        Authorization: Authorization.value,
        uid: uidLocal.value,
        };
    
        // 发送GET请求，获取用户信息
        axios.get(`${ip_port}/user/mine/info`, { headers })
        .then((response) => {
            const { code, message, data } = response.data;
            if (code === 200 && data) {
            // 将后端返回的数据赋值到Vue状态中
            name.value = data.realName || '未知用户';
            uid.value = String(data.uid) || uidLocal.value;
            signature.value = data.signature || '这个人很懒，什么都没有写';
            // 这里假设发帖数为0，具体获取发帖数的API可以再进行调用
            postCount.value = 0; 
            } else {
            console.error(`获取用户信息失败: ${message}`);
            }
        })
        .catch((error) => {
            console.error('请求错误:', error);
        })
        .finally(() => {
            loading.value = false;
        });
    });
    //后端没有发帖数数据，暂时设置为0
    postCount.value=0
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
  