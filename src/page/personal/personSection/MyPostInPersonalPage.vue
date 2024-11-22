<template>
    <div class="collections">
        <el-text  class="page-title" tag="p" >我的帖子</el-text>
        <div v-if="loading" class="loading">加载中...</div>
        <div v-if="error" class="error">{{ error }}</div>
        <ul v-if="posts.length > 0">
        <li v-for="post in posts" :key="post.postId" class="post-item">
            <PostSimplePreview v-bind="post"></PostSimplePreview>
        </li>
        </ul>
        <div v-else>
        <p>你还没有发过帖哦~</p>
        </div>
    </div>
</template>
<script lang="ts" setup name="MyPost">
    import { ref, onMounted } from 'vue';
    import axios from 'axios';
    import Cookies from 'js-cookie';
    import { useHttpStore } from '@/store/Http';
    import PostSimplePreview from '@/components/PostSimplePreview.vue';
    
    // 获取store中定义的ip和端口
    const { ip_port } = useHttpStore();
    
    // 定义状态
    const posts = ref([]);
    const loading = ref(false);
    const error = ref('');
    
    // 从Cookies中获取授权信息和用户ID
    const Authorization = ref(Cookies.get('Authorization') || '');
    const uidLocal = ref(Cookies.get('uid') || '');
    
    // 获取用户收藏的帖子数据
    const fetchCollections = async () => {
        loading.value = true;
        const headers = {
            Authorization: Authorization.value,
            uid: uidLocal.value,
        };
        try {
            const response = await axios.get(`${ip_port}/post/get`, {
                headers,
                params: { uid: uidLocal.value, offset: 0 },
            });
            const { code, message, data } = response.data;
            console.log(data)
            if (code === 200 && Array.isArray(data)) {
                posts.value = data;
            } else {
                error.value = `获取收藏数据失败: ${message}`;
            }
        } catch (err) {
            error.value = '请求收藏数据时出错';
            console.error(err);
        } finally {
            loading.value = false;
        }
    };
    
    // 组件挂载时调用API
    onMounted(() => {
        fetchCollections();
    });
</script>
<style scoped>
    .collections {
        padding: 0 20px;
    }
    
    .page-title {
      font-size: 34px;
      font-weight: bold;
      margin-left: 10px;
      margin-top: 20px;
      margin-bottom: 10px;
    }
    
    .loading {
        color: #007bff;
    }
    
    .error {
        color: red;
    }
    
    ul {
        list-style: none;
        padding: 0;
    }
    
    .post-item {
        display: flex;
        align-items: flex-start;
        margin-bottom: 20px;
        padding: 10px;
        border-bottom: 1px solid #eee;
    }
    
    .post-thumbnail {
        flex: 0 0 120px;
        width: 120px;
        height: 80px;
        margin-right: 15px;
    }
    
    .cover-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 8px;
    }
    
    .post-content {
        flex: 1;
    }
    
    .post-title {
        font-size: 16px;
        margin: 0 0 5px;
        color: #333;
    }
    
    .post-description {
        font-size: 14px;
        color: #666;
        margin-bottom: 10px;
    }
    
    .post-info {
        display: flex;
        gap: 10px;
        font-size: 13px;
        color: #999;
    }
</style>