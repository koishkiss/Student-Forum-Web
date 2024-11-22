<script lang="ts">
import PostSimplePreview from '@/components/PostSimplePreview.vue';
export default {
    name:"MyOwnPostPage",
    components: {
        PostSimplePreview
    }
}
</script>

<template>
<div class="collections">
    <el-text  class="page-title" tag="p" >我的帖子</el-text>
    <div v-if="loading" class="loading">
        加载中...
    </div>

    <div v-if="!hasData" class="no-data">
        <el-empty :image-size="100" description="还没有发表过帖子呢"/>
    </div>

    <ul v-if="!loading && hasData">
        <li v-for="post in posts" :key="post.id" class="post-item">
            <PostSimplePreview v-bind="post"></PostSimplePreview>
            <el-divider class="divider"/>
        </li>
    </ul>

    <div  v-if="!loading && hasData" class="page-bottom">
        <el-text class="page-bottom-text">已经翻到底了哦</el-text>
    </div>
</div>
</template>


<script lang="ts" setup name="MyPost">
import { ref, onMounted, reactive } from 'vue';
import { PostPreviewItemList } from '@/types';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useHttpStore } from '@/store/Http';

// 获取store中定义的ip和端口
const { ip_port } = useHttpStore();

// 定义状态
let posts = reactive<PostPreviewItemList>([]);
const loading = ref(false);
const hasData = ref(true);

// 从Cookies中获取授权信息和用户ID
const Authorization = ref(Cookies.get('Authorization') || '');
const uidLocal = ref(Cookies.get('uid') || '');

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
        if (code === 200) {
            posts = data;
        } else if (code === 40010) {
            hasData.value = false;
        } else {
            console.log(message);
        }
    } catch (err) {
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
    margin-left: 11px;
    color: #007bff;
}

ul {
    list-style: none;
    padding: 0;
}

.post-item {
    padding: 0 10px;
}

.divider {
    margin: 10px 0;
}

.page-bottom {
    margin-top: 0;
    margin-left: 11px;
    font-size: 13px;
    color: #666666;
}
</style>