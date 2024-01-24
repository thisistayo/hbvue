import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import Vue3Mq from 'vue3-mq';  // Update the import
import LandingPage from './components/LandingPage.vue';

const routes = [
    { path: '/', name: 'Home', component: LandingPage },
    { path: '/landing', name: 'LandingPage', component: LandingPage },
    // ... other routes
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

const app = createApp(App);

app.use(router);

app.use(Vue3Mq, {
  breakpoints: {
    sm: 450,
    md: 1250,
    lg: Infinity,
  }
});

app.mount('#app');
