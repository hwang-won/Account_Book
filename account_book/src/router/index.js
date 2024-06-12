import { createRouter, createWebHistory } from 'vue-router';


import loginView from '@/views/loginView.vue';
import regi from '@/components/login/regi.vue';
import id_search from '@/components/login/id_search.vue';
import pw_search from '@/components/login/pw_search.vue';

import mainView from '@/views/mainView.vue';
import detail from '@/components/body/detail.vue';
import list from '@/components/body/list.vue';
import client from '@/components/body/client.vue';
import notice from '@/components/body/notice.vue';
import Body from '@/components/body/body.vue';

const routes = [

    // 로그인 페이지
    {
        path: '/',
        name: 'login',
        component: loginView
    },

    {
        path: '/regi',
        name: 'regi',
        component : regi

    },
    {
        path: '/id_search',
        name: 'id_search',
        component :id_search

    },

    {
        path:'/mainView',
        name: 'main',
        component : mainView

    },

    {
        path: '/pw_search',
        name: 'pw_search',
        component :pw_search

    },

    // MainView -> body.vue
    {
        path: '/body',
        name: 'body',
        component: Body
    },

    // MainView -> notice.vue
    {
        path: '/notice',
        name: 'notice',
        component: notice
    },

    // MainView -> client.vue
    {
        path: '/client',
        name: 'client',
        component: client
    },

    // MainView -> list.vue
    {
        path: '/list',
        name: 'list',
        component: list
    },

    // MainView -> list.vue -> detail.vue
    {
        path: '/detail/:jsonType/:id',
        name: 'detail',
        component: detail
    },
    
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;