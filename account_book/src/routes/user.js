import loginView from '@/views/loginView.vue';
import mainView from '@/views/mainView.vue';

import regi from '@/components/regi.vue';
import id_search from '@/components/id_search.vue';
import pw_search from '@/components/pw_search.vue';



export default[

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
        component :regi

    },
    {
        path: '/id_search',
        name: 'id_search',
        component :id_search

    },
    {
        path: '/pw_search',
        name: 'pw_search',
        component :pw_search

    }
    

    
]