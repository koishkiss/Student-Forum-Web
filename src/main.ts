

//引入createApp用于创建应用
import { createApp } from "vue";
//引入根组件App.vue
import App from "./App.vue";
//引入路由器
import router from "./router";
//引入pinia
import { createPinia } from 'pinia';


const app = createApp(App);

//安装router
app.use(router);

//安装pinia
app.use(createPinia());

//挂载App
app.mount("#app");