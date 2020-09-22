import { Module } from 'vuex';
import axios from 'axios';

import { User, Role, PaginatedResult } from 'Global/constants';
import { RootState } from '@/store/types';

type UserState = {
    users: PaginatedResult<User>,
    rolesLoaded: boolean
}

const store: Module<UserState, RootState> = {
    namespaced: true,
    state: {
        users: {
            results: [],
            total: 0,
            index: 0,
            page: 10,
        },
        rolesLoaded: false,
    },
    actions: {
        async users ({ commit, dispatch }, index?: number, page?: number) {
            console.log('VUEX: Users action received');
            const res: { data: PaginatedResult<User> } = await axios.get('/api/loadUsers', {
                params: {
                    index,
                    page,
                },
            });
            commit('setUsers', res.data);

            // If users are there, load their roles asynchronously for the current page of records
            dispatch('userRoles');
        },
        async userRoles ({
            commit, getters, dispatch, rootGetters,
        }) {
            await dispatch('roles/roles', undefined, { root: true });
            const roles: Role[] = rootGetters['roles/getRoles'];
            if (roles && roles.length > 0) {
                const users: User[] = getters.getUsers.results;
                const userRoles = new Map<number, Role[]>();

                // eslint-disable max-len
                // @ts-ignore
                const roleMap: Map<number, Role> = roles.reduce(
                    (s: Map<number, Role>, e: Role) => {
                        s.set(e.id, e);
                        return s;
                    }, new Map<number, Role>(),
                );
                users.forEach((user) => {
                    if (user.user_role_ids && user.user_role_ids.length > 0) {
                        const arr = new Array<Role>();
                        user.user_role_ids.forEach((id) => {
                            // eslint-disable-next-line
                            // @ts-ignore
                            arr.push(roleMap.get(id));
                        });
                        userRoles.set(user.id, arr);
                    }
                });
                commit('setUserRoles', userRoles);
            }
        },
    },
    getters: {
        getUsers (state: UserState): PaginatedResult<User> {
            return state.users;
        },
        rolesLoaded (state: UserState): boolean {
            return state.rolesLoaded;
        },
    },
    mutations: {
        setUsers (state: UserState, users: PaginatedResult<User>) {
            state.users = users;
            state.rolesLoaded = false;
        },
        setUserRoles (state: UserState, userRoles: Map<number, Array<Role>>) {
            if (state.users && state.users.results) {
                state.users.results.forEach((user) => {
                    if (user.user_role_ids && user.user_role_ids.length > 0) {
                        // eslint-disable-next-line no-param-reassign
                        user.user_roles = userRoles.get(user.id);
                    }
                });
                state.rolesLoaded = true;
            }
        },
    },
};

export default store;
