

//引入createApp用于创建应用
import { createApp } from "vue";
//引入根组件App.vue
import App from "./App.vue";
//引入路由器
import router from "./router";
//引入pinia
import { createPinia } from 'pinia';
//引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import './assets/main.css'


const app = createApp(App);

//安装router
app.use(router);

//安装pinia
app.use(createPinia());

//使用element-plus
app.use(ElementPlus)

//挂载App
app.mount("#app");