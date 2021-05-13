import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//const _import = filePath => () => import('@/views/' + filePath + '.vue');

const routes = [
    {
        path: '/',
        redirect: 'test',
    },
    {
        name: '404',
        path: '/404',
    },
    {
        name: 'test',
        path: '/test',
        component: ()=> import('@/views/editor/test.vue'),
    },
    {
        path: '/blog',
        component: () => import('@/layout/index.vue'),
        children: [
            {
                path: '',
                redirect: 'home'
            },
            {
                name: 'home',
                path: 'home',
                component: () => import('@/views/home/Home.vue'),
            },
            {
                name: 'article',
                path: 'article',
                component: () => import('@/views/article/Article.vue'),
            }
        ]
    },
    {
        path: '/editor',
        component: () => import('@/views/editor/Editor.vue')
    }
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router

