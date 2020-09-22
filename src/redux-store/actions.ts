import { User, Role } from 'Global/constants';

import { ActionFunctions, Payload, ActionWithPayload } from './types';

// eslint-disable-next-line no-shadow
const ReduxActionType = {
    USERS: '@@redux/USERS',
    USER_ROLES: '@@redux/USER-ROLES',
    ROLES: '@@redux/ROLES',
};

const Actions: ActionFunctions = {
    users: (payload?: Payload): ActionWithPayload => ({
        type: ReduxActionType.USERS,
        value: payload || {},
    }),
    userRoles: (payload?: Payload): ActionWithPayload => ({
        type: ReduxActionType.USER_ROLES,
        value: payload || {},
    }),
    roles: (payload?: Payload): ActionWithPayload => ({
        type: ReduxActionType.ROLES,
        value: payload || {},
    }),
};

export {
    ReduxActionType,
    Actions,
};
