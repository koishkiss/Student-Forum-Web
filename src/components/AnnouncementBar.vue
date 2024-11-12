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
      { id: 1, message: '公告1:XXXXXXXXXXXXX' },
      { id: 2, message: '公告2:XXXXXXXXXXXXX' },
      { id: 3, message: '公告3:XXXXXXXXXXXXX' },
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
  transform: translateY(-5px);
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
  padding: 10px;
  background-color: #ffffff;
  border-left: 5px solid #4f46e5;
  border-radius: 4px;
  transition: background-color 0.3s ease, padding-left 0.3s ease;
}

.announcement-bar li:hover {
  background-color: #f3f4f6;
  padding-left: 20px;
}

.announcement-bar li::before {
  content: '📢';
  margin-right: 8px;
  font-size: 18px;
}

</style>
