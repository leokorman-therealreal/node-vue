import { Action } from 'redux';

import { PaginatedResult, User, Role } from 'Global/constants';

export interface StoreState {
    users: PaginatedResult<User>,
    rolesLoaded?: boolean,
    roles?: Role[]
}

export interface Payload {
    users?: PaginatedResult<User>;
    page?: number | undefined,
    index?: number | undefined,
    rolesLoaded?: boolean;
    forceReload?: boolean;
    roles?: Role[];
}

export interface ActionWithPayload extends Action<string> {
    type: string;
    value: Payload;
}

export type ActionFunction = (payload?: Payload) => ActionWithPayload

export interface ActionFunctions {
    [key: string]: ActionFunction,
    roles: ActionFunction
}

export const _EMPTY_STORE_STATE_: StoreState = {
    users: {
        results: [],
        total: 0,
        page: 10,
        index: 0,
    },
    rolesLoaded: false,
    roles: [],
};
