import loginView from '@/views/loginView.vue';
import regi from '@/components/regi.vue';

import mainView from '@/views/mainView.vue';

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
    

    
]