export default [
    {
        path: '/home',
        name: 'home',
        component: () => import('../view/Home/Home.vue'),
    },
    {
        path: '/my',
        name: 'my',
        component: () => import('../view/My/My.vue'),
    },
];
