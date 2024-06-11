import { createApp } from 'vue';
import App from './App.vue';
import Router from './routes/router';
import './style.css'


createApp(App).use(Router).mount('#app');
