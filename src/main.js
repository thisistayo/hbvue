import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';

// Define the feature flags
window.__VUE_PROD_DEVTOOLS__ = false;
window.__VUE_PROD_DEVTOOLS__ = false;
window.__VUE_PROD_HIDE_INTERNAL_FRAMES__ = true;
const app = createApp(App);

// Set up axios globally
app.config.globalProperties.$axios = axios;

app.mount('#app');
