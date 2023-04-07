import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import axiosPlugin from "./plugins/axios";

const app = createApp(App);
app.use(axiosPlugin, { baseURL: import.meta.env.VITE_BASE_URL });
app.mount("#app");
