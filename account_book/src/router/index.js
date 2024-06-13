import { createRouter, createWebHistory } from 'vue-router';

import LoginView from '@/views/loginView.vue';
import Regi from '@/components/login/regi.vue';
import Id_search from '@/components/login/id_search.vue';
import Pw_search from '@/components/login/pw_search.vue';

import Profile from '@/components/login/profile.vue';


import Detail from '@/components/body/detail.vue';
import MainView from '@/views/mainView.vue';
import NoticeDetail from '@/components/body/noticeDetail.vue';

const routes = [

    // 로그인 페이지
    {
        path: '/',
        name: 'Login',
        component: LoginView
    },

    {
        path: '/regi',
        name: 'Regi',
        component : Regi

    },

    {
        path: '/id_search',
        name: 'Id_search',
        component :Id_search

    },

    {
        path: '/pw_search',
        name: 'Pw_search',
        component :Pw_search

    },

    // MainView
    {
        path: '/main',
        name: "MainView",
        component: MainView
    },

    // MainView -> list.vue -> detail.vue
    {
        path: '/detail/:jsonType/:id',
        name: 'Detail',
        component: Detail
    },

    //추가
    {
        path:'/profile',
        name: 'Profile',
        component: Profile

    },
    {
        path:'/noticeDetail/:id',
        name: 'NoticeDetail',  
        component: NoticeDetail
    }
    
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;