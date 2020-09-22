<template>
    <div>
        <div class="columns">
            <div
                class="column is-3"
                v-for="user in users"
                :key="user.userId">
            <div class="card">
                <div class="card-content">
                <div class="media">
                    <div class="media-left">
                    <figure class="image">
                        <img :src="user.avatar" alt="Avatar">
                    </figure>
                    </div>
                    <div class="media-content">
                    <p class="title is-4">{{ displayName(user) }}</p>
                    <p class="subtitle is-6">{{ user.email }}</p>
                    <p class="is-6">{{ user.department }}</p>
                    <p class="is-6">{{ user.ein }}</p>
                    </div>
                </div>
                </div>
                <div class="card-content columns" v-if="rolesLoaded">
                    <div
                        v-for="role in user.user_roles"
                        :key="role.id"
                        class="column PILL">
                        {{ role.name }}
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { User, PaginatedResult } from 'Global/constants';

@Component
export default class Users extends Vue {
    private name = 'users';

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

    get users () : User[] {
        return this.userResult ? this.userResult.results : [];
    }
}
</script>>

<style lang="scss" scoped>
@import "Bulma/sass/utilities/_all";
@import "Bulma/sass/elements/_all";
@import "Bulma/sass/elements/button";

.columns {
  flex-wrap: wrap;
}
.card {
    min-height: 350px;
}
.PILL {
  @extend .button;
  border-radius: calc(var(--base-unit) * 4);
  margin: var(--base-unit);
  cursor: text;
}
.PILL:hover {
  cursor: text;
  border-color: #dbdbdb;
  color: unset !important;
}
</style>
