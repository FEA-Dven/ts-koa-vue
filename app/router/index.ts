import routes from './routes';
import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
const router = new Router({
    routes,
    base: '/tsvue/',
    mode: 'history',
});

export default router;
