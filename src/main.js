import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mixins from './mixins'
import store from './store';
// import VueSweetalert2 from "vue-sweetalert2";
// import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App);
app.use(router);
app.use(mixins);
app.use(store);
// app.use(VueSweetalert2);
app.mount('#app');

window.Kakao.init("44e3b01c9892d77b1ea70570998a2341");

