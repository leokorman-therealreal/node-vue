// eslint-disable

enum ClientStoreType {
    VUEX='VUEX',
    REDUX='REDUX'
}

interface Role {
    id: number,
    name: string,
    description?: string,
    permissions: Array<{ resource: string, bitmask: number }>
}

interface User {
    id: number,
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    ein: string,
    avatar?: string,
    department: string,
    job_title: string,
    user_role_ids?: number[],
    user_roles?: Role[]
}

interface PaginatedResult<R> {
    results: R[],
    index?: number | undefined,
    page?: number | undefined,
    total: number
}

interface ServerContext {
    roles: Role[],
    cache: boolean,
    store: ClientStoreType
}

export {
    User, Role, ServerContext, ClientStoreType, PaginatedResult,
};
