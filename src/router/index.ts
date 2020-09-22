import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import { ServerContext, ClientStoreType } from 'Global/constants';

import Home from '@/views/Home.vue';
import UsersV from '@/views/UsersV.vue';
import UsersR from '@/views/UsersR.vue';

Vue.use(VueRouter);

export default function createRouter (context: ServerContext): VueRouter {
    const routes: Array<RouteConfig> = [{
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/users',
        name: 'Users',
        component: context.store === ClientStoreType.REDUX ? UsersR : UsersV,
    },
    ];

    return new VueRouter({
        mode: 'history',
        routes,
    });
}
