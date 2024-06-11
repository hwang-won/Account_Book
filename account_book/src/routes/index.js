//라우터를 설정해줄 파일 

import { createWebHistory, createRouter} from "vue-router";

import user from "@/routes/user.js";

const router = createRouter({
    history: createWebHistory(),
    routes:[
        ...user
    ]
});

export default router;