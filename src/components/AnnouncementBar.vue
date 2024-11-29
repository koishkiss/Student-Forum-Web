<script lang="ts">
  export default {
    name:'AnnouncementBar'  //组件名
  }
</script>

<template>
  <div class="announcement-bar">
    <h2>公告栏</h2>
    <ul>
      <li v-for="announcement in announcements" :key="announcement.id">
        {{ announcement.message }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup name="AnnouncementBar">
  import { onMounted, ref } from 'vue';

  const announcements = ref<Array<{ id: number; message: string }>>([]);

  onMounted(() => {
    announcements.value = [
      { id: 1, message: '🎉 欢迎加入我们的社区！大家好！我们非常高兴地欢迎新成员加入我们的论坛大家庭。' },
      { id: 2, message: '发帖前请先搜索，避免重复提问。不要发布任何违法或不适当的内容。' },
      { id: 3, message: '积极参与讨论，分享你的知识和经验。我们期待与你一起成长，共同打造一个充满活力的社区！' }
    ];
  });
</script>

<style scoped>
.announcement-bar {
  border-radius: 8px;
  padding: 20px;
  background: linear-gradient(135deg, #e0e7ff, #c7d2fe);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.announcement-bar:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.announcement-bar h2 {
  margin-bottom: 16px;
  font-size: 24px;
  font-weight: bold;
  color: #4a4a4a;
}

.announcement-bar ul {
  list-style-type: none;
  padding: 0;
}

.announcement-bar li {
  font-size: 16px;
  margin-bottom: 12px;
  padding: 10px 30px 10px 10px;
  background-color: #ffffff;
  border-left: 5px solid #4f46e5;
  border-radius: 4px;
  transition: background-color 0.3s ease, padding-left 0.3s ease, padding-right 0.3s ease;
}

.announcement-bar li:hover {
  background-color: #f3f4f6;
  padding:10px 10px 10px 20px;
}

.announcement-bar li::before {
  content: '📢';
  margin-right: 8px;
  font-size: 18px;
}

</style>
