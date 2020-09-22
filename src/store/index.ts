import Vue from 'vue';
import Vuex from 'vuex';

import { ServerContext } from 'Global/constants';
import users from './modules/users';
import RoleStore from './modules/roles';

export default function createStore (serverContext: ServerContext) {
    Vue.use(Vuex);

    return new Vuex.Store({
        state: {
            version: '1.0.0',
        },
        modules: {
            users,
            roles: new RoleStore(serverContext),
        },
    });
}
