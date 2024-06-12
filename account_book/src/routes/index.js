//라우터를 설정해줄 파일 
import { createWebHistory, createRouter } from "vue-router";

import loginView from '@/views/loginView.vue';
import regi from '@/components/regi.vue';
import id_search from '@/components/id_search.vue';
import pw_search from '@/components/pw_search.vue';

import mainView from '@/views/mainView.vue';
import ProfileEdit from "@/components/profileEdit.vue";

const routes = [

    {
        path: '/',
        name: 'login',
        component: loginView
    },
    {
        path: '/main',
        name: 'main',
        component: mainView
    },
    {
        path: '/regi',
        name: 'regi',
        component: regi

    },
    {
        path: '/id_search',
        name: 'id_search',
        component: id_search
    },
    {
        path: '/pw_search',
        name: 'pw_search',
        component: pw_search
    },
    {
        path: '/profileEdit',
        name: 'profileEdit',
        component: ProfileEdit
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;