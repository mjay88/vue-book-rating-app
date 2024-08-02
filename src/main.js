import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import BaseButton from "./components/BaseButton.vue";

const app = createApp(App).component("BaseButton", BaseButton).mount("#app");
