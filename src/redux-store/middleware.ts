import axios from 'axios';

import { Role, User, PaginatedResult } from 'Global/constants';
import { mapActions } from 'vuex';
import { StoreState, ActionWithPayload, Payload } from './types';
import { ReduxActionType, Actions } from './actions';

type ReduxStore = {
    getState: () => StoreState;
    dispatch: (action: ActionWithPayload) => Promise<void>;
}
// eslint-disable-next-line max-len
const loadEntries = (store: ReduxStore) => (next: any) => async (action: ActionWithPayload) => {
    let nextAction = null;
    console.log(`REDUX: Middleware action received: ${action.type}`);
    if (action.type === ReduxActionType.USERS) {
        const res: { data: PaginatedResult<User> } = await axios.get('/api/users', {
            params: {
                index: Number(action.value.index),
                page: Number(action.value.page),
            },
        });
        if (res.data.results) {
            const users: User[] = res.data.results;
            const roles: Role[] = store.getState().roles || [];
            if (roles.length > 0) {
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
                        user.user_roles = arr;
                    }
                });
            }
            action.value = {
                users: {
                    index: action.value.index,
                    page: action.value.page,
                    total: users.length,
                    results: users,
                },
                rolesLoaded: true,
            };
            // Dispatch roles to get a fresh set for next retreival
            store.dispatch(Actions.roles());
        }
        nextAction = next(action);
    } else if (action.type === ReduxActionType.ROLES) {
        console.log(`Roles middleware force load: ${action.value.forceReload}`);
        let roles = store.getState().roles || [];
        if (action.value.forceReload || roles.length === 0) {
            const res: { data: Role[] } = await axios.get('/api/roles');
            roles = res.data || [];
        } else {
            console.log('REDUX: Middleware dispatching  action for fresh roles');
            store.dispatch(Actions.roles({ forceReload: true }));
        }
        action.value = {
            roles,
        };
        nextAction = next(action);
    }
    console.log('Dispatching next: ');
    console.log(nextAction);
    return nextAction;
};

export default loadEntries;
