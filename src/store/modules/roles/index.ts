import {
    ActionTree, GetterTree, MutationTree, Module,
} from 'vuex';
import axios from 'axios';

import { Role, ServerContext } from 'Global/constants';
import { RootState } from '@/store/types';

export interface RoleState { roles: Role[] }

export default class RoleStore implements Module<RoleState, RootState> {
    namespaced = true;

    state: RoleState = {
        roles: [],
    };

    constructor (context: ServerContext) {
        this.state.roles = context.roles || [];
    }

    actions: ActionTree<RoleState, RootState> = {
        async roles ({ commit, getters, dispatch }, forceReload?: boolean) {
            console.log('VUEX: Roles action received');
            let res = {
                data: getters.getRoles,
            };
            if (forceReload || res.data.length === 0) {
                console.log('VUEX: Fetching fresh roles');
                res = await axios.get('/api/loadRoles');
                commit('setRoles', res.data);
            } else {
                console.log('VUEX: Prefetched roles available.');
                console.log('VUEX: dispatching  action for fresh roles');
                dispatch('roles/roles', true);
            }
        },
    }

    getters: GetterTree<RoleState, RootState> = {
        getRoles (state: RoleState): Role[] {
            return state.roles;
        },
    }

    mutations: MutationTree<RoleState> = {
        setRoles (state: RoleState, r: Role[]): void {
            state.roles = r;
        },
    }
}
