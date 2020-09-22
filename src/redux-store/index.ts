import { createStore, applyMiddleware, Reducer } from 'redux';

import {
    ServerContext, User, Role, PaginatedResult,
} from 'Global/constants';
import {
    StoreState, ActionWithPayload, _EMPTY_STORE_STATE_, Payload,
} from './types';
import loadEntries from './middleware';

import { ReduxActionType } from './actions';

export default function createReduxStore (serverContext: ServerContext) {
    const state = { ..._EMPTY_STORE_STATE_ };

    function _usersReducer (prevState: StoreState, data: Payload): StoreState {
        return {
            ...prevState,
            users: data.users || _EMPTY_STORE_STATE_.users,
            rolesLoaded: data.rolesLoaded,
        };
    }
    function _rolesReducer (prevState: StoreState, data: Payload): StoreState {
        return {
            ...prevState,
            roles: data.roles,
        };
    }
    const _reducer:
        /* eslint-disable max-len */
        Reducer<StoreState, ActionWithPayload> = (prevState: StoreState = _EMPTY_STORE_STATE_, action: ActionWithPayload): StoreState => {
            console.log(`REDUX: action received: ${action.type}`);
            let newState: StoreState;
            switch (action.type) {
            case ReduxActionType.USERS:
                newState = {
                    ...prevState,
                    ..._usersReducer(prevState, action.value || _EMPTY_STORE_STATE_),
                };
                break;
            case ReduxActionType.ROLES:
                newState = {
                    ...prevState,
                    ..._rolesReducer(prevState, action.value || _EMPTY_STORE_STATE_),
                };
                break;
            default:
                return prevState;
            }
            console.log('REDUX: Updated store state after reducers');
            console.log(newState);
            return newState;
        };
    return createStore(
        _reducer,
        {
            ...state, roles: serverContext.roles || [],
        },
        applyMiddleware(loadEntries),
    );
}
