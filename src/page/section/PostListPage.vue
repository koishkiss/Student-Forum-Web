<script lang="ts">
import PostPreview from '@/components/PostPreview.vue';
import PostingBox from '@/components/PostingBox.vue';
export default {
  name:'PostListPage',  //组件名
  components:{
    PostPreview,PostingBox
  }
}
</script>

<template>
<div class="sections-post-box" v-if="!isLoading">

    <div class="no-data-box" v-if="!hasData">
        <el-empty :image-size="100" description="这里还什么都没有呢"/>
    </div>

    <div class="post-preview-list-box" v-if="hasData">
        <ul class="post-preview-list">
            <li v-for="post in sectionPostList" :key="post.id" class="post-preview-item">
                <PostPreview v-bind="post" :adminList="adminList"/>
            </li>
        </ul>
    </div>

    <div class="page-select-item" v-if="hasData">
        <el-pagination
            v-model:current-page="currentPage" 
            v-model:page-size="pageSize" 
            layout="total, prev, pager, next, jumper" 
            :page-count="maxPagination" 
            :total="recordsCount" 
            @current-change="handleCurrentChange" 
        />
    </div>

    <el-divider style="margin-bottom: 10px;"/>

    <div class="post-new-post-box">
        <PostingBox :sectionId="route.params.id" @uploadPost="reloadPost"/>
    </div>
</div>
</template>

<script lang="ts" setup>
import { PostPreviewItemList } from '@/types';
import axios from 'axios';
import { onBeforeMount, reactive, ref } from 'vue';
import { useHttpStore } from '@/store/Http';
import { ElMessageBox } from 'element-plus';
import { useRoute } from 'vue-router';
import Cookies from 'js-cookie';

defineProps(["adminList"])

const { ip_port } = useHttpStore();
const route = useRoute();

let sectionPostList = reactive<PostPreviewItemList>([]);
const isLoading = ref(true);
const hasData = ref(true);

const maxPagination = ref(1);
const currentPage = ref(1);
const pageSize = ref(5);
const recordsCount = ref(0);

function reloadPost() {
    handleCurrentChange(1);
    hasData.value = true;
}

onBeforeMount(() => {
    axios({
        method: "post",
        url: ip_port + "/post/get?sectionId=" + route.params.id,
        data: {
            "pagination": currentPage.value,
            "pageSize": pageSize.value
        },
        headers: {
            "Authorization": Cookies.get("Authorization"),
            "uid": Cookies.get("uid")
        }
    })
    .then(function (response) {
        const data = response.data;
        if (data.code == 200) {
            sectionPostList = data.data.records;
            recordsCount.value = data.data.totalRecordNum;
            maxPagination.value = data.data.maxPagination;
            isLoading.value = false;
            scrollTo(0,0);
        } else if (data.code === 40010) {
            isLoading.value = false;
            hasData.value = false;
        } else {
            isLoading.value = false;
            ElMessageBox.alert(data.message, "", {confirmButtonText: 'OK'});
            hasData.value = false;
        }
    })
    .catch(function (error) {
        console.log(error);
        isLoading.value = false;
    });
})

const handleCurrentChange = (val: number) => {
    axios({
        method: "post",
        url: ip_port + "/post/get?sectionId=" + route.params.id,
        data: {
            "pagination": val,
            "pageSize": pageSize.value
        },
        headers: {
            "Authorization": Cookies.get("Authorization"),
            "uid": Cookies.get("uid")
        }
    })
    .then(function (response) {
        const data = response.data;
        if (data.code == 200) {
            isLoading.value = true;
            sectionPostList = [];
            sectionPostList = data.data.records;
            recordsCount.value = data.data.totalRecordNum;
            maxPagination.value = data.data.maxPagination;
            isLoading.value = false;
            scrollTo(0,0);
        } else {
            ElMessageBox.alert(data.message, "", {confirmButtonText: 'OK'});
        }
    })
    .catch(function (error) {
        console.log(error);
        isLoading.value = false;
    });
}

</script>

<style scoped>

.sections-post-box {
    padding: 0 20px;
}

.post-preview-list-box {
    margin-top: 10px;
}

.post-preview-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.post-preview-item {
  padding: 5px;
}

.page-select-item {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    justify-content: center;
}
</style>
