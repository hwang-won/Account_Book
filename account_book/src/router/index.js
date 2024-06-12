import { createRouter, createWebHistory } from 'vue-router';
import Detail from '../views/Detail.vue';
import list from '../components/List.vue';
import notice from '../views/Notice.vue';
import client from '../views/Client.vue';
import RecentList from '../components/RecentList.vue';

const routes = [
    {
        path: '/',
        name: 'list',
        component: list
    },
    {
        path: '/list',
        name: 'list',
        component: list
    },
    {
        path: '/detail/:id',
        name: 'Detail',
        component: Detail
    },
    {
        path: '/notice',
        name: 'notice',
        component: notice
    },
    {
        path: '/client',
        name: 'client',
        component: client
    },
    {
        path: '/recentList',
        name: 'recentList',
        component: RecentList
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
