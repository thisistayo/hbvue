import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import LandingPage from './components/LandingPage.vue';
import '@fortawesome/fontawesome-free/css/all.css'

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


app.mount('#app');
