import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import BaseButton from "./components/BaseButton.vue";
import router from "./router";

const app = createApp(App)
	.use(router)
	.component("BaseButton", BaseButton)
	.mount("#app");
