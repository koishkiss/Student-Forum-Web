<script lang="ts">
export default {
    name:'postPage',
    component:{
        
    }
}
</script >


<template>
        <div class="post-list">
        <postThread />
        <postThread />
    </div>
</template>

<script lang="ts" setup >
import postThread from './postThread.vue';
</script>
<style scoped>

.post-list{
    width: 900px;
    display:flex;
    justify-content: center;
    justify-self: center;
    flex-direction: column;
    background-color: #ffffffa2;
    border-radius: 10px; /* 圆角 */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>

    
