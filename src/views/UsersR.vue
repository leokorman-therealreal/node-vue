<template>
    <div>
        <div class="notification is-info">
            <h1>Viewing records from REDUX store</h1>
        </div>
        <users-jsx :userResult="users" :rolesLoaded="rolesLoaded"/>
    </div>
</template>

<script>
import { mapState, mapActions } from 'redux-vuex';

import { Actions } from '@/redux-store/actions';
import UsersJsx from '@/components/UsersJsx';

export default {
    data () {
        return {
            ...(mapState({
                users: (state) => state.users,
                rolesLoaded: (state) => state.rolesLoaded,
            }).call(this)),
        };
    },
    components: {
        UsersJsx,
    },
    created () {
        console.log('Dispatching action to get users');
        this.store.dispatch(Actions.users({ index: 0, page: 12 }));
    },
};
</script>

<style lang="scss">
@import "Bulma/sass/utilities/_all";
@import "Bulma/sass/elements/_all";
@import "Bulma/sass/elements/button";

.columns {
  flex-wrap: wrap;
}
.card {
    min-height: 350px;
}
div.notification {
    width: 400px;
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
