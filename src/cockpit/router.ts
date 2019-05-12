import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'landing',
            component: () => import('./views/VLandingPage.vue'),
        }, {
            path: '/about',
            name: 'about',
            component: () => import('./views/VAbout.vue'),
        }, {
            path: '/register',
            name: 'register',
            component: () => import('./views/VNewUser.vue'),
        }, {
            path: '/trip/view',
            name: 'view',
            component: () => import('./views/VSearchTrip.vue'),
        }, {
            path: '/trip/view/:id',
            name: 'view_with_id',
            component: () => import('./views/VSearchTrip.vue'),
        }, {
            path: '/trip/new',
            name: 'new',
            component: () => import('./views/VNewTrip.vue'),
        }, {
            path: '*',
            name: '404',
            component: () => import('./views/V404.vue'),
        },
    ],
});
