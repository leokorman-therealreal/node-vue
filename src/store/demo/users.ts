// eslint-ignore
// @ts-ignore
const userData = {
    data: {
        results: [{
            id: 1,
            first_name: 'John',
            last_name: 'Doe',
            email: 'jd@test.com',
        },
        {
            id: 2,
            first_name: 'Jane',
            last_name: 'Eyre',
            email: 'je@test.com',
        }],
        total: 10,
    },
};

type User = {
    id: number,
    'first_name': string,
    'last_name': string,
    'email': string,
    'avatar'?: string
}

type UserState = {
    users: User[] | [],
    total: number,
}

type StoreState = {
    commit: (name: string, ...payload: any) => void
}

type Actions<T, A> = {
    [key: string]: (state: T, ...payload: Array<A>) => void | Promise<void>
}

type GettersReturn = UserState | User

interface Getters<T, G> {
    [key: string]: (state: T) => G | null
}

interface Mutations<T> {
    [key: string]: (state: T, ...payload: any) => void
}

interface ApplicationStoreModule <S, T, A, G> {
    namespaced?: boolean,
    state: T,
    actions: Actions<S, A>,
    getters?: Getters<T, G>,
    mutations?: Mutations<T>
}

type UserResult = {
    data: {
        results?: User[],
        total: number,
    }
}

function userAPI (page?: number, size?: number): Promise<UserResult> {
    const p = new Promise<UserResult>((resolve) => {
        setTimeout(() => {
            resolve(userData);
        }, 500);
    });
    return p;
}

class UserStore
implements ApplicationStoreModule
            <StoreState,
            UserState,
            number,
            GettersReturn> {
    namespaced = true;

    state = {
        users: [],
        total: 0,
        currentUser: null,
    };

    actions = {
        async users (state: StoreState, index?: number, page?: number) {
            const results = await userAPI(index, page);
            state.commit('setUsers', results.data.results, results.data.total);
        },
    };

    getters = {
        getUsers (state: UserState) {
            return {
                users: state.users,
                total: state.total,
            };
        },
    };

    mutations = {
        setUsers (state: UserState, users: User[], total: number | undefined) {
            state.users = users as User[];
            state.total = total as number;
        },
    }
}

export default UserStore;
