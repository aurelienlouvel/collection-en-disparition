import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faBookOpen,
  faCameraRetro,
  faGift,
  faMap,
  faPause,
  faPlay,
  faQuestion,
  faStopwatch,
  faVolumeHigh,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

//Pinia
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

//Font Awesome Library Icons
library.add(
  faStopwatch,
  faPlay,
  faPause,
  faVolumeHigh,
  faVolumeMute,
  faArrowLeft,
  faArrowRight,
  faQuestion,
  faBookOpen,
  faMap,
  faCameraRetro,
  faGift
);

app.use(pinia);
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
