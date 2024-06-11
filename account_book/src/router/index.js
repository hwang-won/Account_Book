import { createRouter, createWebHistory } from 'vue-router';
import Detail from '../views/detail.vue';
import list from '../components/list.vue';

const routes = [
    {
        path: '/',
        name: 'list',
        component: list
    },
    {
        path: '/detail/:id',
        name: 'Detail',
        component: Detail
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
