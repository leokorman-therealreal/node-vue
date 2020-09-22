import { Component, Prop, Vue } from 'vue-property-decorator';

import { User, PaginatedResult } from 'Global/constants';

@Component
export default class UsersJsx extends Vue {
    private name = 'users-jsx';

    @Prop() readonly userResult: PaginatedResult<User> = {
        results: [],
        total: 0,
        index: 0,
        page: 10,
    };

    @Prop() readonly rolesLoaded: boolean = false;

    public displayName (user: User) {
        return `${user.first_name} ${user.last_name}`;
    }

    get users (): User[] {
        return this.userResult ? this.userResult.results : [];
    }

    private showRoles (user: User) {
        const roles = user.user_roles || [];
        if (this.rolesLoaded && user.user_roles) {
            return (
                <div class="card-content columns"> {
                    roles.map((role) => (
                        <div class="column PILL">
                            { role.name }
                        </div>
                    ))
                }
                </div>
            );
        }
        return null;
    }

    render () {
        return (
            <div class="columns"> {
                this.users.map((user) => (
                    <div class="column is-3">
                        <div class="card">
                            <div class="card-content">
                                <div class="media">
                                    <div class="media-left">
                                        <figure class="image">
                                            <img src={ user.avatar } alt="Avatar"/>
                                        </figure>
                                    </div>
                                    <div class="media-content">
                                        <p class="title is-4">{ this.displayName(user) }</p>
                                        <p class="subtitle is-6">{ user.email }</p>
                                        <p class="is-6">{ user.department }</p>
                                        <p class="is-6">{ user.ein }</p>
                                    </div>
                                </div>
                            </div>
                            { this.showRoles(user) }
                        </div>
                    </div>
                ))
            }
            </div>
        );
    }
}
