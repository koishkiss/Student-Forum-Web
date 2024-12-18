<script lang="ts">
import { Plus } from "@element-plus/icons-vue"
import axios from 'axios';
import { useHttpStore } from '@/store/Http';
export default {
  name:"CreateSection",
  components:{
    Plus
  }
}
</script>

<template>
<div class="create-section-box">
  <el-text class="create-section-title">
    创建新版块
  </el-text>

  <div class="input-box">
    <div style="display: flex; flex-direction: row;">
      <div class="cover-and-input-box">
        <el-tooltip
          class="box-item"
          effect="dark"
          content="上传版块头像"
          placement="left"
        >
          <el-upload 
            ref="upload"
            class="cover-uploader" 
            :action="ip_port+'/upload/photo'" 
            :headers="{
              Authorization: Cookies.get('Authorization'),
              uid: Cookies.get('uid')
            }" 
            name="photo" 
            :show-file-list="false"
            :limit="1"
            :multiple="false"
            :on-exceed="handleExceed"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeCoverUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="cover" fit="cover" />
            <el-icon v-else class="cover-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-tooltip>
      </div>

      <div style="flex: 1; display: flex; align-items: center; justify-content: center;">
        <el-button type="primary" plain @click="uploadSection">
          创建
        </el-button>
      </div>
    </div>

    <div class="title-input-box" style="margin-top: 5px;">
      <el-input 
        v-model="name" 
        placeholder="请填写版块名称" 
        maxlength="20" 
        show-word-limit 
        type="text" 
        class="name-input" 
      />
    </div>

    <div class="content-input-box" style="margin-top: 5px;">
      <el-input 
        v-model="slogan" 
        placeholder="请填写简介" 
        :autosize="{ minRows: 2, maxRows: 3 }" 
        maxlength="50" 
        show-word-limit 
        type="textarea" 
        class="slogan-input" 
      />
    </div>

  </div>
</div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage, ElMessageBox, genFileId, UploadProps, UploadRawFile } from 'element-plus';
import Cookies from 'js-cookie';

const props = defineProps(["classify"]);
const emits = defineEmits(["newSectionAdd"])
const { ip_port } = useHttpStore();

const upload = ref();
const name = ref("");
const slogan = ref("");
const imageUrl = ref('');
const imageName = ref('');

function uploadSection() {
  if (!imageName.value) {
    ElMessage.error("请上传版块头像!");
    return;
  }
  axios({
    method:"post",
    url:`${ip_port}/section/create`,
    headers: {
      "Authorization": Cookies.get("Authorization"),
      "uid": Cookies.get("uid")
    },
    data: {
      "classify":props.classify,
      "name":name.value,
      "slogan":slogan.value,
      "icon":imageName.value?imageName.value:null
    }
  })
  .then(function (response) {
    const data = response.data;
    if (data.code == 200) {
      ElMessage({message:"创建成功",type:"success"});
      name.value = '';
      slogan.value = '';
      imageUrl.value = '';
      imageName.value = '';
      emits("newSectionAdd");
    } else {
      ElMessageBox.alert(data.message, "", {confirmButtonText: 'OK'});
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
  upload.value!.submit();
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response
) => {
  console.log(response)
  if (response.code === 200) {
    imageUrl.value = response.data.iconURL;
    imageName.value = response.data.icon;
  } else {
    ElMessage.error(response.message)
  }
}

const beforeCoverUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/png' && 
      rawFile.type !== 'image/jpg' && 
      rawFile.type !== 'image/bmp' && 
      rawFile.type !== 'image/jpeg') {
    ElMessage.error('不允许的图片格式!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 5) {
    ElMessage.error('图片大小不可超过5MB!')
    return false
  }
  return true
}

</script>


<style scoped>
.create-section-box {
  border: 1px dotted rgb(171, 171, 171);
  border-radius: 10px;
  padding: 5px;
  margin: 2px 15px 0px 15px;
  display: flex;
  flex-direction: column;
}

.create-section-title {
  font-size: 20px;
  font-weight: bold;
}

.cover-uploader {
  margin-top: 0px;
  height: 100px;
  width: 100px;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
.cover-uploader:hover {
  border-color: var(--el-color-primary);
}
.cover {
  height: 100px;
}
.el-icon.cover-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
}
</style>
