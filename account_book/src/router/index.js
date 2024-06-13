import { createRouter, createWebHistory } from 'vue-router';

import LoginView from '@/views/loginView.vue';
import Regi from '@/components/login/regi.vue';
import Id_search from '@/components/login/id_search.vue';
import Pw_search from '@/components/login/pw_search.vue';

import ProfileView from '@/views/profileView.vue';
import ListDetailView from '@/views/listDetailView.vue';

import MainView from '@/views/mainView.vue';
import NoticeView from '@/views/noticeView.vue';

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

    // MainView(body, list, notice, FAQ)
    {
        path: '/main',
        name: "MainView",
        component: MainView
    },

    // MainView -> list.vue -> detail.vue
    {
        path: '/detail/:jsonType/:id',
        name: 'ListDetailView',
        component: ListDetailView
    },

    // MainView -> header.vue -> profile.vue -> profileEdit
    {
        path:'/profile',
        name: 'Profile',
        component: ProfileView

    },
    // notice -> noticeView -> noticeDetail
    {
        path:'/noticeView/:id',
        name: 'NoticeView',  
        component: NoticeView
    }
    
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;