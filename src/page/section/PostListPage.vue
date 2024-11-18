<template>
    <div class="sections-post-box" v-if="!isLoading">
        <ul>
            <li v-for="post in sectionPostList" :key="post.id" class="post-preview-list">
                <PostPreview v-bind=post />
            </li>
        </ul>
        <div class="page-select-item">
            <el-pagination v-model:current-page="currentPage" background :page-size="1" :pager-count="7"
            layout="prev, pager, next" :page-count="maxPagination" @current-change="handleCurrentChange" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { PostPreviewItemList } from '@/types';
import axios from 'axios';
import { onMounted, onBeforeMount, reactive, ref } from 'vue';
import { useHttpStore } from '@/store/Http';
import { useRoute } from 'vue-router';
import Cookies from 'js-cookie';
import PostPreview from '@/components/PostPreview.vue';

const { ip_port } = useHttpStore();
const route = useRoute()
let sectionPostList = reactive<PostPreviewItemList>([]);
let maxPagination = ref(10)
let pagination = ref(1)
const isLoading = ref(true);
const currentPage = ref(1);

onBeforeMount(() => {
    axios({
        method: "post",
        url: ip_port + "/post/get?sectionId=" + route.query.sectionId,
        data: {
            "pagination": 1,
            "pageSize": 1
        },
        headers: {
            "Authorization": Cookies.get("Authorization"),
            "uid": Cookies.get("uid")
        }
    })
        .then(function (response) {
            const data = response.data;
            maxPagination = data.data.maxPagination;
            sectionPostList = data.data.records;
            isLoading.value = false;
        })
        .catch(function (error) {
            console.log(error);
            isLoading.value = false;
        });
})

const handleCurrentChange = (val: number) => {
    isLoading.value = true;
    console.log(val);
    sectionPostList = []
    axios({
        method: "post",
        url: ip_port + "/post/get?sectionId=" + route.query.sectionId,
        data: {
            "pagination": val,
            "pageSize": 1
        },
        headers: {
            "Authorization": Cookies.get("Authorization"),
            "uid": Cookies.get("uid")
        }
    })
        .then(function (response) {
            const data = response.data;
            maxPagination = data.data.maxPagination;
            sectionPostList = data.data.records;
            isLoading.value = false
        })
        .catch(function (error) {
            console.log(error);
            isLoading.value = false;
        });
}

</script>

<style>
.post-preview-list {
    list-style-type: none;
    padding: 0;
    margin-top: 50px;
}

.page-select-item {
    margin-left: 40px;
}
</style>
