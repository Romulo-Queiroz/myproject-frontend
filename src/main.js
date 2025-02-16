import { createApp } from "vue";
import App from "./App.vue";
import { createVuetify } from "vuetify";
import "bootstrap/dist/css/bootstrap.min.css";

const vuetify = createVuetify();

createApp(App).use(vuetify).mount("#app");
