import { createRouter, createWebHistory } from 'vue-router'



import home from '../components/BoardList.vue';
import boardwrite from '../components/BoardWrite.vue';
import BoardDetail from '../components/BoardDetail.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
       


        { path: '/', component: home },
        { path: '/board/register', component: boardwrite },
        { path: '/board/:boardIdx', component: BoardDetail, props: true },  // idx를 URL 파라미터로 받는 라우트 추가

        // { path: '/f', component: Create },
        // { path: '/g', component: Signup }

    ]
})

export default router;