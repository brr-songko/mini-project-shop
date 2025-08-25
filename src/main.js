import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mixins from './mixins'
import store from './store';

const app = createApp(App);
app.use(router);
app.use(mixins);
app.use(store);
app.use(VueSweetalert2);
app.mount('#app');

window.Kakao.init("카카오 앱 키");

